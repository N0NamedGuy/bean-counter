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
    IonContent,
    IonText,
    IonButton,
    IonTextarea
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
                    <IonBackButton defaultHref="/beans/settings" />
                </IonButtons>
                <IonTitle>Exportar dados</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonText>
                Estes são os dados que foram gravados no telemóvel.
                Copia e cola para lugar seguro.
            </IonText>

            <IonTextarea ref={userDataEl}
                className="export-code"
                readOnly
                rows={10}
                value={base64Data} />

            <IonButton expand="block" onClick={() => doCopy()}>Copiar</IonButton>
        </IonContent>
    </IonPage>
}