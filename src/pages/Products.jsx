import React, { useState } from 'react';
import { ProductsList } from '../components/ProductsList';

import {
    IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { ProductAddForm } from '../components/ProductAddForm';
import { createProduct as createProduct, listProducts as listProducts } from '../model/product';

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
        setIsLoading(true);
        createProduct(newProduct)
            .then((products) => {
                setProducts(products);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleRemoveProduct(product) {
        setIsLoading(true);
        removeProduct(product.id)
            .then((products) => {
                setProducts(products);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonTitle>Conta-feijões</IonTitle>
                <IonButtons slot="primary">
                    <IonButton routerLink='/settings'>
                        Definições
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            {
                isLoading ? <div>A carregar dados</div>: <>
                    <ProductAddForm products={products} onSave={handleAddProduct} />
                    <ProductsList products={products} onRemove={removeProduct} />
                </>
            }
        </IonContent>
    </IonPage>
};

export { Products };
