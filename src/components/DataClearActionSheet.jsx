import { IonActionSheet } from '@ionic/react';
import { useHistory } from 'react-router';
import { truncateProducts } from '../model/product';

export const DataClearActionSheet = ({ isOpen, onDismiss }) => {
    const history = useHistory();

    function handleDismiss(ev) {
        switch (ev.detail.data?.action) {
            case 'delete':
                truncateProducts()
                    .then(() => {
                        onDismiss(false);
                    })
                    .catch(() => {
                        console.error('could not truncate database')
                    });
                break;

            case 'export':
                onDismiss(false);
                history.push('/beans/settings/export');
                break;

            case 'cancel':
                onDismiss(false);
                break;

            default:
                onDismiss(false);
        }
    }

    const deleteButton = {
        text: 'Eliminar todos os dados',
        role: 'destructive',
        data: {
            action: 'delete'
        }
    };

    const exportButton = {
        text: 'Exportar dados',
        data: {
            action: 'export'
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
            'Queres apagar todos os produtos e seus registos?\n'
            + 'Depois não venhas chorar que perdeste tudo!\n'
            + 'Vê lá se não valerá a pena exportar os dados todos primeiro...'
        }
        buttons={[
            deleteButton,
            exportButton,
            cancelButton
        ]}
    />
}