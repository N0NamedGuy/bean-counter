import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { ProductTotalsChart } from "../components/ProductTotalsChart";
import { calcTotalsByProduct } from "../model/product";


export const Charts = () => {
    const [productsWithTotals, setProductsWithTotals] = useState(null);

    useIonViewWillEnter(() => {
        calcTotalsByProduct()
            .then((totals) => {
                setProductsWithTotals(totals);
            })
    }, []);

    return <IonPage>
        <IonContent>
            <ProductTotalsChart productsWithTotals={productsWithTotals} />
        </IonContent>
    </IonPage>
}