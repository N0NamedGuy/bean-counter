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
            if (window.confirm('Deseja guardar a mundaça? Este software ainda está em estado beta. Cuidado com as modificações.')) {
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