import React, { useContext, useState } from 'react';

import {
    IonBackButton, IonButtons,
    IonContent, IonFooter, IonHeader, IonItem,
    IonLabel, IonList, IonListHeader, IonPage,
    IonTitle, IonToolbar
} from '@ionic/react';
import { DataClearActionSheet } from '../components/DataClearActionSheet';
import { ThemeActionSheet } from '../components/ThemeActionSheet';
import { ThemeContext } from '../contexts/ThemeContext';
import { exportCsv } from '../model/product';
import { fileTextDownload, getTodayDateISO } from '../utils';
export const Settings = () => {
    const [themeSheetOpen, setThemeSheetOpen] = useState(false);
    const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);

    const {
        darkMode,
        setDarkMode
    } = useContext(ThemeContext);

    function getDarkModeText() {
        const dict = {
            'system': 'Sistema',
            'dark': 'Escuro',
            'light': 'Claro'
        }

        return dict[darkMode] || 'Desconhecido';
    }

    async function generateCsv() {
        const csv = await exportCsv();
        fileTextDownload(csv, `conta-feijoes-${getTodayDateISO()}.csv`, 'text/csv');
    }

    return <IonPage>
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonTitle>Defini&ccedil;&otilde;es</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList inset>
                <IonListHeader>
                    <IonLabel>Aparência</IonLabel>
                </IonListHeader>
                <IonItem button onClick={() => setThemeSheetOpen(true)}>
                    <IonLabel>
                        Tema
                    </IonLabel>
                    <IonLabel slot="end">
                        <p>{getDarkModeText()}</p>
                    </IonLabel>
                    <ThemeActionSheet isOpen={themeSheetOpen}
                        onDismiss={({ isOpen, action }) => {
                            setThemeSheetOpen(isOpen);
                            setDarkMode(action);
                        }} />
                </IonItem>
            </IonList>
            <IonList inset>
                <IonListHeader>
                    <IonLabel>Gestão de dados</IonLabel>
                </IonListHeader>
                <IonItem button routerLink="/beans/settings/import">
                    <IonLabel>Importar</IonLabel>
                </IonItem>
                <IonItem button routerLink="/beans/settings/export">
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

            <IonList inset>
                <IonListHeader>
                    <IonLabel>Experimental</IonLabel>
                </IonListHeader>
                <IonItem button onClick={() => generateCsv()}>
                    <IonLabel>Gerar CSV</IonLabel>
                </IonItem>
                <IonItem button routerLink="/beans/settings/importcsv">
                    <IonLabel>Importar CSV</IonLabel>
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