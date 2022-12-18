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
import { createProduct, listProductsByRecordYearWithTotals } from '../model/product';

const Products = () => {
    const [productsByYear, setProductsByYear] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useIonViewWillEnter(() => {
        setIsLoading(true);
        listProductsByRecordYearWithTotals()
            .then((data) => {
                setProductsByYear(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    async function handleAddProduct(newProduct) {
        await createProduct(newProduct);
        const data = await listProductsByRecordYearWithTotals();
        setProductsByYear(data);
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
                    <ProductAddForm onSave={handleAddProduct} />
                    <ProductsList productsByYear={productsByYear} />
                </>
            }
        </IonContent>
    </IonPage>
};

export { Products };
