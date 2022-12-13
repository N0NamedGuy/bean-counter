import { getNewId } from '../utils';
import { findProduct, updateProduct } from './product'

export async function listProductRecords(productId) {
    const product = await findProduct(productId);

    const records = {...product.records};

    return records;
}

export async function createProductRecord(productId, record) {
    const product = await findProduct(productId);

    product.records = [
        {
            id: getNewId(product.records, e => e.id),
            ...record
        },
        ...product.records
    ];

    const updatedProduct = await updateProduct(product);
    return updatedProduct;
}

export async function removeProductRecord(productId, recordId) {
    const product = await findProduct(productId);

    product.records = product.records.filter((r) => {
        return r.id !== recordId 
    });

    const updatedProduct = await updateProduct(product);
    return updatedProduct;
}