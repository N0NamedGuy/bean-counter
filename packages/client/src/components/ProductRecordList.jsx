import {
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList
} from '@ionic/react';
import React from 'react';

export const ProductRecordList = ({ records, onRemove }) => {

    return <IonList>
        {records && records.map((record) => {
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
        })}
    </IonList>
};
