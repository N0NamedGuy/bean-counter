import React, { useState } from 'react';
import { ProductsList } from '../components/ProductsList';

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import { ProductAddForm } from '../components/ProductAddForm';
import { calcTotalsByProduct, createProduct, removeProduct } from '../model/product';

const Products = () => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useIonViewWillEnter(() => {
        setIsLoading(true);
        calcTotalsByProduct()
            .then((products) => {
                setProducts(products);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    async function handleAddProduct(newProduct) {
        await createProduct(newProduct);
        const productWithTotals = await calcTotalsByProduct();
        setProducts(productWithTotals);
    }

    async function handleRemoveProduct(product) {
        await removeProduct(product.id);
        const productWithTotals = await calcTotalsByProduct();
        setProducts(productWithTotals);
    }

    return <IonPage>
        <IonHeader collapse>
            <IonToolbar>
                <IonTitle>Produtos</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {
                isLoading ? <div>A carregar dados</div> : <>
                    <ProductAddForm products={products} onSave={handleAddProduct} />
                    <ProductsList productsWithTotals={products} onRemove={handleRemoveProduct} />
                </>
            }
        </IonContent>
    </IonPage>
};

export { Products };
