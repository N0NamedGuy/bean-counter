import React, { useRef, useState } from 'react';
import { useStorageState } from "../hooks/useStorageState";

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

    return <div>
        <span>Cole aqui os dados do seu outro dispositivo</span>
        <br/>
        <button onClick={() => doImport()}>Importar</button>
        <div>
            <textarea ref={userDataEl} className="export-code" value={importedData}
            onChange={onImportDataChange}></textarea>
        </div>
    </div>
}