import React, { useEffect, useState } from 'react';

import {
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList
} from '@ionic/react';

const ProductsList = ({ products, onRemove }) => {
    const [totals, setTotals] = useState({});

    useEffect(() => {
        const newTotals = (products || []).map(p => {
            return {
                id: p.id,
                total: p.records.reduce((acc, cur) => acc + cur.quantity, 0)
            }
        })
            .reduce((acc, cur) => {
                acc[cur.id] = cur.total;
                return acc;
            }, {});

        setTotals(newTotals);
    }, [products]);

    return products && products.length > 0 ?
        <IonList>
            {products.map((product) => {
                return <IonItemSliding key={product.id}>
                    <IonItem button routerLink={`/details/${product.id}`}>
                        <IonLabel>{product.name}</IonLabel>
                        <IonLabel slot="end">
                            {totals[product.id]}&nbsp;g
                        </IonLabel>
                    </IonItem>

                    <IonItemOptions slide="end"
                        onIonSwipe={e => onRemove(product)}>
                        <IonItemOption color="danger" expandable
                            onClick={e => onRemove(product)}>
                            Apagar
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            })}
        </IonList>
        :
        <div className="ion-padding">
            <h2>Ainda não adicionou nenhum produto</h2>
        </div>
}

export { ProductsList };
