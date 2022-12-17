import React, { useRef, useState } from 'react';

import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { saveProductDb } from '../model/product';

export const ImportCsv = () => {
    const [importedData, setImportedData] = useState('');
    const userDataEl = useRef(null);

    const fileInputRef = useRef(null);

    const doImport = () => {
        const fullCsv = importedData.split('\n');

        const [_, ...csv] = fullCsv;

        const productCache = {};

        csv.map(line => line.split(',')).forEach(([
            productId,
            productName,
            recordId,
            recordDate,
            recordQuantity
        ]) => {
            let prod = productCache[productId];

            if (!prod) {
                prod = productCache[productId] = {
                    id: parseInt(productId),
                    name: productName.replace(/^"(.*)"$/, '$1'),
                    records: []
                };
            }

            if (recordId) {
                prod.records.push({
                    id: parseInt(recordId),
                    recordDate,
                    quantity: parseInt(recordQuantity)
                });
            }
        });

        const newDb = Object.values(productCache);
        saveProductDb(newDb)
            .then(() => {
                window.alert('Dados importados do CSV!')
            });
    };

    const importFile = (e) =>  {
        const files = e.target.files;

        if (!files || !files.length) {
            return;
        }

        const file = files[0];

        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            const csvData = e.target.result;
            setImportedData(csvData);
        });
        reader.readAsText(file);
    }

    const onImportDataChange = (event) => {
        setImportedData(event.target.value);
    };

    return <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Importar dados (CSV)</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonButton expand="full" onClick={() => fileInputRef.current.click()}>
                Carregar ficheiro CSV
                <input ref={fileInputRef}
                type="file"
                className="ion-hide"
                id="csvFile"
                name="csvFile"
                accept=".csv"
                onChange={importFile} />
            </IonButton>

            <IonList>
                <IonItem>
                    <IonTextarea ref={userDataEl}
                        value={importedData}
                        onIonChange={onImportDataChange}
                        placeholder="Cole aqui o CSV"
                        className="export-code"
                        rows={10}>
                    </IonTextarea>
                </IonItem>
            </IonList>

            <IonButton expand="block" onClick={() => doImport()}>
                Importar CSV
            </IonButton>
        </IonContent>
    </IonPage>
}