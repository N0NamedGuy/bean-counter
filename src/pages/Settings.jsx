import React from 'react';

import {
    IonBackButton, IonButtons,
    IonContent,
    IonHeader, IonList, IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonFooter
} from '@ionic/react';

export const Settings = () => {
    return <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Defini&ccedil;&otilde;es</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList>
                <IonItem button routerLink="/import">
                    <IonLabel>Importar</IonLabel>
                </IonItem>
                <IonItem button routerLink="/export">
                    <IonLabel>Exportar</IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
        <IonFooter>
            <IonToolbar>
                <IonTitle>(c) 2022 David Serrano</IonTitle>
            </IonToolbar>
        </IonFooter>
    </IonPage>
};

