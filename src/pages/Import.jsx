import React, { useRef, useState } from 'react';
import { useStorageState } from "../hooks/useStorageState";

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonText, IonList, IonItem, IonTextarea, IonLabel, IonButton } from '@ionic/react';

export const Import = () => {
    // eslint-disable-next-line
    const [products, setProducts] = useStorageState('products', []);
    const [importedData, setImportedData] = useState('');
    const userDataEl = useRef(null);

    const doImport = () => {
        let importedString;
        try {
            importedString = atob(importedData);
        } catch (e) {
            window.alert('Copiaste isso mal!')
            return;
        }

        if (window.confirm('Estás prestes a substituir os dados que tens. Tens a certeza que queres continuar?')) {
            try {
                const data = JSON.parse(importedString);

                // Check if array
                if (!Array.isArray(data)) {
                    window.alert('Isto devia ser uma lista... mas aparentemente não é...');
                    return;
                }

                // Check if products have the necessary props
                const valid = data.every((product) => {
                    return typeof product.id !== 'undefined' &&
                        typeof product.name !== 'undefined' &&
                        typeof product.quantity !== 'undefined' &&
                        Array.isArray(product.records) &&
                        product.records.every((record) => {
                            return typeof record.recordDate !== 'undefined' &&
                                typeof record.quantity !== 'undefined' &&
                                typeof record.id !== 'undefined'
                        })
                }
                );

                if (!valid) {
                    window.alert('Estes dados estão inválidos. Importação abortada.');
                    return;
                }

                setProducts(data);
                window.alert('Dados importados!')

            } catch (e) {
                window.alert('Os dados podem estar inválidos ou copiaste isso mal!');
                return;
            }

        }
    };

    const onImportDataChange = (event) => {
        setImportedData(event.target.value);
    };

    return <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Importar dados</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList>
                <IonItem>
                    <IonTextarea ref={userDataEl}
                        value={importedData}
                        onIonChange={onImportDataChange}
                        placeholder="Cole aqui os dados do seu outro dispositivo"
                        rows={10}>
                    </IonTextarea>
                </IonItem>
            </IonList>

            <IonButton expand="block" onClick={() => doImport()}>
                Importar
            </IonButton>
        </IonContent>
    </IonPage>
}