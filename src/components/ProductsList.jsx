import {
    IonItem,
    IonItemDivider,
    IonItemGroup, IonLabel,
    IonList
} from '@ionic/react';
import { humanWeight } from '../utils';

const ProductListWithTotals = ({ products, year, total }) => {
    return products && products.length > 0 ?
        <IonItemGroup>
            {year ?
                <IonItemDivider>
                    <IonLabel>
                        {year}
                    </IonLabel>
                    {<IonLabel slot="end">
                        {humanWeight(total, 1)}
                    </IonLabel>}
                </IonItemDivider> :
                <IonItemDivider>
                    <IonLabel>
                        Sem registos
                    </IonLabel>
                </IonItemDivider>
            }
            {products.map((product) => {
                return <IonItem button routerLink={`/beans/products/${product.id}`}
                    key={`${year ?? 'empty'}-${product.id}`}>
                    <IonLabel>{product.name}</IonLabel>
                    <IonLabel slot="end">
                        {humanWeight(product.total, 1)}
                    </IonLabel>
                </IonItem>
            })}
        </IonItemGroup>
        :
        <div className="ion-padding">
            <h2>Ainda não adicionou nenhum produto</h2>
        </div>
}

const ProductsList = ({ productsByYear, onRemove }) => {
    return productsByYear ?
        <IonList>
            {productsByYear.map(({ year, total, products }) => {
                return <ProductListWithTotals products={products}
                    key={year ?? 'empty'}
                    total={total}
                    year={year}
                    onRemove={onRemove} />
            })}
        </IonList>
        :
        <div className="ion-padding">
            <h2>Ainda não adicionou nenhum produto</h2>
        </div>
}

export { ProductsList };
