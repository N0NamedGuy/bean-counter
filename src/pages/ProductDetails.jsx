import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ProductRecordList } from '../components/ProductRecordList';

import {
    IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage,
    IonTitle,
    IonToolbar, useIonModal, useIonViewWillEnter
} from '@ionic/react';
import { ProductEditModal } from '../components/ProductEditModal';
import { ProductRecordAddForm } from '../components/ProductRecordAddForm';
import { findProduct, removeProduct, updateProduct } from '../model/product';
import { createProductRecord, removeProductRecord } from '../model/product-record';
import { humanWeight, isBigUnit } from '../utils';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [productError, setProductError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [quantity, setQuantity] = useState(null);

    const history = useHistory();

    const [present, dismiss] = useIonModal(ProductEditModal, {
        onDismiss: (data, role) => { dismiss(data, role) },
        product
    });

    useIonViewWillEnter((e) => {
        setIsLoading(true);
        findProduct(parseInt(id))
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                setProductError(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const quantity = (product?.records || []).reduce((acc, cur) => acc + parseInt(cur.quantity, 10), 0);
        setQuantity(quantity);
    }, [product]);

    function addRecord(newRecord) {
        if (isLoading) {
            return;
        }

        createProductRecord(product.id, newRecord)
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                setProductError(e);
            });
    }

    function removeRecord(record) {
        if (isLoading) {
            return;
        }

        removeProductRecord(product.id, record.id)
            .then((product) => {
                setProduct(product);
            })
            .catch((e) => {
                setProductError(e);
            });
    }

    function handleUpdateProduct(product) {
        updateProduct(product)
            .then((product) => {
                setProduct(product);
            });
    }

    function handleRemoveProduct(product) {
        removeProduct(product.id)
            .then(() => {
                history.replace('/beans');
            });
    }

    function openEditModal() {
        present({
            onWillDismiss: (ev) => {
                if (ev.detail.role === 'save') {
                    handleUpdateProduct(ev.detail.data);
                } else if (ev.detail.role === 'remove') {
                    handleRemoveProduct(ev.detail.data);
                }
            },
            canDismiss: true,
            showBackdrop: true
        });
    }

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle>{product && product.name}</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/beans/products" />
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={() => openEditModal()}>Editar</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            {productError ? <h2>
                Este produto já não existe (ou nunca existiu!)
            </h2> :
                product && <>
                    <IonList>
                        <IonItem>
                            <h1>
                                Total: {humanWeight(quantity)}
                                &nbsp;<small>(desde sempre)</small>
                            </h1>
                        </IonItem>
                    </IonList>
                    <ProductRecordAddForm product={product} onSave={addRecord} />
                    <ProductRecordList records={product.records}
                        onRemove={removeRecord} />
                    {(!product.records || product.records.length === 0) &&
                        <div className="ion-padding">
                            <h2>
                                Sem registos para este produto.
                                Vá colher cenas pá!
                            </h2>
                        </div>
                    }
                </>}
        </IonContent>
    </IonPage>
};

export { ProductDetails };
