import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { home, pieChart, settings } from 'ionicons/icons';
import { Redirect, Route } from "react-router";
import { Charts } from "./Charts";
import { Export } from "./Export";
import { Import } from "./Import";
import { ImportCsv } from "./ImportCsv";
import { ProductDetails } from "./ProductDetails";
import { Products } from "./Products";
import { Settings } from "./Settings";

export const Tabs = () => {
    return <IonReactRouter>
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="products" href="/beans/products">
                    <IonIcon icon={home} />
                    <IonLabel>Produtos</IonLabel>
                </IonTabButton>

                <IonTabButton tab="charts" href="/beans/charts">
                    <IonIcon icon={pieChart} />
                    <IonLabel>Gráficos</IonLabel>
                </IonTabButton>

                <IonTabButton tab="settings" href="/beans/settings">
                    <IonIcon icon={settings} />
                    <IonLabel>Definições</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Redirect exact path="/" to="/beans/products" />
                <Redirect exact path="/beans" to="/beans/products" />
                <Route exact path="/beans/products">
                    <Products />
                </Route>
                <Route exact path="/beans/products/:id">
                    <ProductDetails />
                </Route>
                <Route exact path="/beans/charts">
                    <Charts />
                </Route>
                <Route exact path="/beans/settings">
                    <Settings /> 
                </Route>
                <Route exact path="/beans/settings/export">
                    <Export />
                </Route>
                <Route exact path="/beans/settings/import">
                    <Import />
                </Route>
                <Route exact path="/beans/settings/importcsv">
                    <ImportCsv />
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    </IonReactRouter>
}