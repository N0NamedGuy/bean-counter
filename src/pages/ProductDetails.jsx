import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductRecordList } from '../components/ProductRecordList';

import {
    IonBackButton,
    IonButtons, IonContent, IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { ProductRecordAddForm } from '../components/ProductRecordAddForm';
import { findProduct } from '../model/product';
import { createProductRecord, removeProductRecord } from '../model/product-record';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [productError, setProductError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useIonViewWillEnter((e) => {
        setIsLoading(true);
        findProduct(parseInt(id))
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                console.error('on list', e)
                setProductError(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    function addRecord(newRecord) {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        createProductRecord(product.id, newRecord)
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                console.error('on add', e)
                setProductError(e);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function removeRecord(record) {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        removeProductRecord(product.id, record.id)
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                console.error('on remove', e)
                setProductError(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle>{product && product.name}</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <ProductRecordAddForm product={product} onSave={addRecord} />

            {productError ? <h2>
                Este produto já não existe (ou nunca existiu!)
                <pre>{JSON.stringify(productError, null, 2)}</pre>
            </h2> :
                product && <ProductRecordList records={product.records}
                    onRemove={removeRecord} />
            }
        </IonContent>
    </IonPage>
};

export { ProductDetails };
