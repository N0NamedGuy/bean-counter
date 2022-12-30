import { getNewId } from '../utils';

const PRODUCTS_KEY = 'storedState.products';
const SAFE_MODE = (process.env.NODE_ENV === 'production');

let productsDbCache = null;

export async function findProduct(id) {
    const db = await loadProductDb();

    const found = db.find((p) => {
        return p.id === id;
    })

    return { ...found };
}

export async function listProducts() {
    const db = await loadProductDb();

    return [...db];
}

export async function createProduct(product) {
    const db = await loadProductDb();

    const newDb = [
        {
            ...product,
            id: getNewId(db, e => e.id)
        },
        ...db
    ];

    await saveProductDb(newDb);

    return await loadProductDb();
}

export async function updateProduct(newProduct) {
    const storedProduct = await findProduct(newProduct.id);
    const db = await loadProductDb();

    const updatedProduct = {
        ...storedProduct,
        ...newProduct
    };

    const storedProductIndex = db.findIndex((p) => {
        return p.id === updatedProduct.id
    });

    db[storedProductIndex] = updatedProduct;
    await saveProductDb(db);

    return { ...updatedProduct };
}

export async function removeProduct(id) {
    const db = await loadProductDb();

    const newDb = db.filter(p => p.id !== id);

    await saveProductDb(newDb);

    return await loadProductDb();
}

export async function truncateProducts() {
    return await saveProductDb([]);
}

export async function exportCsv() {
    const db = await listProducts();

    // CSV FORMAT
    const header = [
        'PROD_ID',
        'PROD_NAME',
        'RECORD_ID',
        'RECORD_DATE',
        'RECORD_QUANTITY'
    ];

    const handleProductRows = (p) => {
        if (p.records?.length > 0) {
            return p.records.map((r) => {
                return [
                    p.id,
                    `"${p.name}"`,
                    r.id,
                    r.recordDate,
                    r.quantity
                ];
            })
        } else {
            return [[p.id, `"${p.name}"`]]
        }
    }

    const prods = db.reduce((prev, cur) => {
        return [
            ...prev,
            ...handleProductRows(cur)
        ];
    }, []);

    const csv = [
        header,
        ...prods
    ].map((line) => {
        return line.join(',');
    }).join('\n');

    return csv;
}

export async function listProductsWithTotals() {
    const products = await listProducts();

    const newTotals = (products || []).map(p => {
        return {
            id: p.id,
            name: p.name,
            total: p.records.reduce((acc, cur) => acc + cur.quantity, 0)
        }
    });

    return newTotals;
}

export async function listProductsByRecordFnWithTotals(keyFn, keyName) {
    const products = await listProducts();

    const recordsWithProduct = products.reduce((prev, product) => {
        return [
            ...prev,
            ...product.records.map((r) => {
                return {
                    product: product,
                    ...r
                }
            })
        ]
    }, [])

    const recordsByKey = recordsWithProduct.reduce((byKey, record) => {
        const recordKey = keyFn(record);

        let recordsInKey = byKey[recordKey];

        if (!recordsInKey) {
            recordsInKey = [];
            byKey[recordKey] = recordsInKey;
        }

        recordsInKey.push(record);

        return byKey;
    }, {});

    const productsByKey = Object.entries(recordsByKey)
        .reduce((prev, [recordKey, records]) => {

            const uniqProducts = records.map((record) => {
                return record.product;
            }).filter((product, index, arr) => {
                return arr.indexOf(product) === index;
            }).map((product) => {
                const filteredRecords = product.records.filter((r) => {
                    return keyFn(r) === recordKey;
                });
                return {
                    ...product,
                    total: filteredRecords.reduce((total, r) => total + r.quantity, 0),
                    filteredRecords
                }
            });

            return [
                ...prev,
                {
                    [keyName]: recordKey,
                    total: uniqProducts.reduce((total, p) => total + p.total, 0),
                    products: uniqProducts
                }
            ]
        }, []);
    
    const productsWithNoRecords = products.filter((p) => {
        return p.records?.length === 0;
    }).map((p) => {
        return {
            ...p,
            total: 0
        }
    })

    const groupedProducts = productsByKey;

    if (productsWithNoRecords.length > 0) {
        groupedProducts.push({
            [keyName]: null,
            total: 0,
            products: productsWithNoRecords
        });
    }

    return groupedProducts;
}

export async function listProductsByRecordYearWithTotals() {
    return (await listProductsByRecordFnWithTotals((r) => {
        const year = r.recordDate.split('-')[0];
        return year;
    }, 'year')).sort((a, b) => {
        return parseInt(b.year ?? Number.MAX_SAFE_INTEGER) -
            parseInt(a.year ?? Number.MAX_SAFE_INTEGER);
    })
}

async function loadProductDb() {
    if (!productsDbCache) {
        try {
            productsDbCache = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
        } catch {
            productsDbCache = []
        }
    }

    return productsDbCache || [];
}

export function saveProductDb(newDb) {

    const doSaveProduct = () => {
        const serialised = JSON.stringify(newDb);
        localStorage.setItem(PRODUCTS_KEY, serialised);
        productsDbCache = JSON.parse(serialised);
    }

    return new Promise((resolve, reject) => {
        if (SAFE_MODE) {
            if (window.confirm('Deseja guardar a mudança? Este software ainda está em estado beta. Cuidado com as modificações.')) {
                doSaveProduct();
                resolve();
            } else {
                reject();
            }
        } else {
            doSaveProduct();
            resolve();
        }
    });
}