import { IonActionSheet } from '@ionic/react';

export const ThemeActionSheet = ({ isOpen, onDismiss }) => {
    function handleDismiss(ev) {
        onDismiss({
            isOpen: false,
            action: ev.detail.data?.action
        });
    }

    const systemButton = {
        text: 'Sistema',
        data: {
            action: 'system'
        }
    };

    const darkButton = {
        text: 'Escuro',
        data: {
            action: 'dark'
        }
    };

    const lightButton = {
        text: 'Claro',
        data: {
            action: 'light'
        }
    };

    return <IonActionSheet isOpen={isOpen}
        onDidDismiss={handleDismiss}
        header="Tema"
        buttons={[
            systemButton,
            darkButton,
            lightButton
        ]}
    />
}