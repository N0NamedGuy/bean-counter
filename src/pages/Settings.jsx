import React, { useState } from 'react';

import {
    IonBackButton, IonButtons,
    IonContent, IonFooter, IonHeader, IonItem,
    IonLabel, IonList, IonListHeader, IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { DataClearActionSheet } from '../components/DataClearActionSheet';
export const Settings = () => {
    const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);

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
            <IonList inset>
                <IonListHeader>
                    <IonLabel>Gestão de dados</IonLabel>
                </IonListHeader>
                <IonItem button routerLink="/import">
                    <IonLabel>Importar</IonLabel>
                </IonItem>
                <IonItem button routerLink="/export">
                    <IonLabel>Exportar</IonLabel>
                </IonItem>
                <IonItem button onClick={() => setDeleteSheetOpen(true)}>
                    <IonLabel color="danger">
                        Eliminar todos os dados
                    </IonLabel>
                    <DataClearActionSheet isOpen={deleteSheetOpen}
                        onDismiss={(isOpen) => setDeleteSheetOpen(isOpen)} />
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