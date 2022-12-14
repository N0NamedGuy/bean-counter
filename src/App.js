import React from 'react';
import './App.css';

import { Export } from './pages/Export';
import { ProductDetails } from './pages/ProductDetails';
import { Products } from './pages/Products';

import { IonReactRouter } from '@ionic/react-router';

import {
    IonApp,
    IonRouterOutlet, setupIonicReact
} from '@ionic/react';
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import {
    Route
} from 'react-router';
import { ThemeContext } from './contexts/ThemeContext';
import { useDarkMode } from './hooks/useDarkMode';
import { Import } from './pages/Import';
import { Settings } from './pages/Settings';
import './theme/variables.css';

setupIonicReact({});

function App() {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <ThemeContext.Provider value={{
            darkMode,
            setDarkMode
        }}>
            <IonApp>
                <IonReactRouter basename="beans">
                    <IonRouterOutlet>
                        <Route path="/" exact children={<Products />} />
                        <Route path="/details/:id" exact children={<ProductDetails />} />
                        <Route path="/settings" children={<Settings />} />
                        <Route path="/export" children={<Export />} />
                        <Route path="/import" children={<Import />} />
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </ThemeContext.Provider>
    );
}

export default App;
