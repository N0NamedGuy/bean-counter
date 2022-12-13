import React, { useState } from 'react';
import { ProductsList } from '../components/ProductsList';

import {
    IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import { ProductAddForm } from '../components/ProductAddForm';
import { createProduct, listProducts, removeProduct } from '../model/product';

const Products = () => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useIonViewWillEnter(() => {
        setIsLoading(true);
        listProducts()
            .then((products) => {
                setProducts(products);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    function handleAddProduct(newProduct) {
        createProduct(newProduct)
            .then((products) => {
                setProducts(products);
            })
    }

    function handleRemoveProduct(product) {
        removeProduct(product.id)
            .then((products) => {
                setProducts(products);
            });
    }

    return <IonPage>
        <IonHeader collapse>
            <IonToolbar>
                <IonTitle>Conta-feijões</IonTitle>
                <IonButtons slot="primary">
                    <IonButton routerLink='/settings'>
                        Definições
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {
                isLoading ? <div>A carregar dados</div> : <>
                    <ProductAddForm products={products} onSave={handleAddProduct} />
                    <ProductsList products={products} onRemove={handleRemoveProduct} />
                </>
            }
        </IonContent>
    </IonPage>
};

export { Products };
