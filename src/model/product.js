import { getNewId } from '../utils';

const PRODUCTS_KEY = 'storedState.products';

let productsDbCache = null;

export async function findProduct(id) {
    const db = await loadProductDb();

    const found = db.find((p) => {
        return p.id === id;
    })

    return found;
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
        ...db,
    ];

    await saveProductDb(newDb);

    return await loadProductDb();
}

export async function updateProduct(newProduct) {
    const storedProduct = await findProduct(newProduct);
    const db = await loadProductDb();

    const updatedProduct = {
        ...storedProduct,
        ...newProduct
    };

    const storedProductIndex = db.findIndex((p) => {
        return p.id = updatedProduct.id
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

async function loadProductDb() {
    if (!productsDbCache) {
        try {
            productsDbCache = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
        } catch {
            productsDbCache = []
        }
    }

    return productsDbCache;
}

async function saveProductDb(newDb) {
    const serialised = JSON.stringify(newDb);

    localStorage.setItem(PRODUCTS_KEY, serialised);
    productsDbCache = JSON.parse(serialised);
}