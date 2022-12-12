import { useRef } from "react";

import React from 'react';
import { useStorageState } from "../hooks/useStorageState";

import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent
 } from '@ionic/react';

export const Export = () => {
    const [products] = useStorageState('products', []);
    const userDataEl = useRef(null);

    const base64Data = btoa(JSON.stringify(products))

    const doCopy = () => {
        userDataEl.current.select();
        document.execCommand("copy");
    }

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

            <span>Estes são os dados que foram gravados no telemóvel. Copie e cole para lugar seguro</span>
            <br />
            <button onClick={() => doCopy()}>Copiar</button>
            <div>
                <textarea ref={userDataEl} className="export-code" readOnly value={base64Data}></textarea>
            </div>
        </IonContent>
    </IonPage>
}