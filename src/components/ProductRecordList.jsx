import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader } from '@ionic/react';
import React from 'react';

export const ProductRecordList = ({ records, onRemove }) => {
    const quantity = records.reduce((acc, cur) => acc + parseInt(cur.quantity, 10), 0);

    return records && records.length > 0 ? <IonList>
        <IonListHeader>
            <IonLabel><h1>Total: {quantity} g</h1></IonLabel>
        </IonListHeader>
        {

            records && records.map((record) => {
                return <IonItemSliding key={record.id}>
                    <IonItem>
                        <IonLabel>{record.quantity}g</IonLabel>
                        <IonLabel slot="end">
                            {record.recordDate}
                        </IonLabel>
                    </IonItem>

                    <IonItemOptions slide="end"
                        onIonSwipe={e => onRemove(record)}>
                        <IonItemOption color="danger" expandable
                            onClick={e => onRemove(record)}>
                            Apagar
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            })
        }
    </IonList> : <h2>
        Sem registos para este produto.
        Vá colher cenas pá!
    </h2>
};
