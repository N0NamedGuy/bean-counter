import { IonActionSheet } from '@ionic/react';

export const ProductRemoveActionSheet = ({ isOpen, onDismiss }) => {
    function handleDismiss(ev) {
        switch (ev.detail.data?.action) {
            case 'delete':
                onDismiss(false, 'remove');
                break;

            case 'cancel':
                onDismiss(false);
                break;

            default:
                onDismiss(false);
        }
    }

    const deleteButton = {
        text: 'Eliminar produto e seus registos',
        role: 'destructive',
        data: {
            action: 'delete'
        }
    };

    const cancelButton = {
        text: 'Cancelar',
        role: 'cancel',
        data: {
            action: 'cancel'
        }
    };

    return <IonActionSheet isOpen={isOpen}
        onDidDismiss={handleDismiss}
        header="Confirmação de eliminação"
        subHeader={
            'Queres eliminar este produto e seus registos?\n'
            + 'Depois não venhas chorar que perdeste tudo!\n'
            + 'Vê lá se não valerá a pena exportar os dados todos primeiro...'
        }
        buttons={[
            deleteButton,
            cancelButton
        ]}
    />
}