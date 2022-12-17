import {
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList
} from '@ionic/react';

const ProductsList = ({ productsWithTotals, onRemove }) => {
    return productsWithTotals && productsWithTotals.length > 0 ?
        <IonList>
            {productsWithTotals.map((product) => {
                return <IonItemSliding key={product.id}>
                    <IonItem button routerLink={`/beans/products/${product.id}`}>
                        <IonLabel>{product.name}</IonLabel>
                        <IonLabel slot="end">
                            {product.total}&nbsp;g
                        </IonLabel>
                    </IonItem>

                    <IonItemOptions slide="end"
                        onIonSwipe={e => onRemove(product)}>
                        <IonItemOption color="danger" expandable
                            onClick={e => onRemove(product)}>
                            Apagar
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            })}
        </IonList>
        :
        <div className="ion-padding">
            <h2>Ainda não adicionou nenhum produto</h2>
        </div>
}

export { ProductsList };
