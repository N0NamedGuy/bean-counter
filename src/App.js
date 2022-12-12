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

import {
    Route
} from 'react-router';
import { Import } from './pages/Import';
import { Settings } from './pages/Settings';

setupIonicReact({});

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (mediaQuery) => toggleDarkTheme(mediaQuery.matches));

// Add or remove the "dark" class based on if the media query matches
function toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
}

function App() {
    return (
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
    );
}

export default App;
