import React, { useRef, useState } from 'react';

import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { saveProductDb } from '../model/product';

export const ImportCsv = () => {
    const [importedData, setImportedData] = useState('');
    const [importErrors, setImportErrors] = useState([]);
    const userDataEl = useRef(null);

    const fileInputRef = useRef(null);

    const doImport = () => {
        const fullCsv = importedData.split('\n');

        const [_, ...csv] = fullCsv;

        const productCache = {};

        const importErrors = [];

        const addError = (desc, index, line) => {
            index = index + 1;
            console.error(desc, index, line);
            importErrors.push({ desc, index, line,
            key: new Date().getTime() });
        }

        csv.forEach((line, index) => {
            if (line.trim() === '') {
                return;
            }

            const [
                productId,
                productName,
                recordId,
                recordDate,
                recordQuantity
            ] = line.trim().split(',');

            let prod = productCache[productId];

            if (!prod) {
                if (!productId || productId.trim() === '') {
                    addError('Falta ID de produto (PROD_ID)', index, line);
                    return;
                }

                if (!productName || productName.trim() === '') {
                    addError('Falta nome de produto (PROD_NAME)', index, line);
                    return;
                }
                prod = productCache[productId] = {
                    id: parseInt(productId),
                    name: productName.replace(/^"(.*)"$/, '$1'),
                    records: []
                };
            }

            if (recordId) {
                if (!recordId || recordId.trim() === '') {
                    addError('Falta ID de registo de produto', index, line);
                    return;
                }

                if (!recordDate || recordDate.trim() === '') {
                    addError('Falta registo de data', index, line);
                    return;
                }

                if (!recordQuantity || recordQuantity.trim() === '') {
                    addError('Falta quantidade', index, line);
                    return;
                }

                prod.records.push({
                    id: parseInt(recordId),
                    recordDate,
                    quantity: parseInt(recordQuantity)
                });
            }
        });

        setImportErrors(importErrors);

        if (importErrors.length > 0) {
            if (!window.confirm('Houveram erros na importação do CSV... Continuar com a importação?')) {
                return;
            }
        }

        const newDb = Object.values(productCache);
        saveProductDb(newDb)
            .then(() => {
                if (importErrors.length === 0) {
                    window.alert('Dados importados do CSV!')
                } else {
                    window.alert('Dados importados com erros...')
                }
            });
    };

    const importFile = (e) => {
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
                    <IonBackButton defaultHref="/beans/settings" />
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

            {
                (importErrors.length > 0) && <IonList>
                    <IonListHeader>
                        <IonLabel color="danger">Erros de importação</IonLabel>
                    </IonListHeader>

                    {
                        importErrors.map((err) => {
                            return <IonItem key={err.key}>
                                <IonLabel>
                                    {err.desc}
                                    <p>{err.line}</p>
                                </IonLabel>
                                <IonLabel slot="end">
                                    Linha {err.index}
                                </IonLabel>
                            </IonItem>
                        })
                    }
                </IonList>
            }

            <IonButton expand="block" onClick={() => doImport()}>
                Importar CSV
            </IonButton>
        </IonContent>
    </IonPage>
}