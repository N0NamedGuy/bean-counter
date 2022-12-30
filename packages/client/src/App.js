import React from 'react';
import './App.css';

import {
    IonApp, setupIonicReact
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
import { ThemeContext } from './contexts/ThemeContext';
import { useDarkMode } from './hooks/useDarkMode';
import { Tabs } from './pages/Tabs';
import './theme/variables.css';
import './charts.scss';

setupIonicReact({});

function App() {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <ThemeContext.Provider value={{
            darkMode,
            setDarkMode
        }}>
            <IonApp>
                <Tabs />
            </IonApp>
        </ThemeContext.Provider>
    );
}

export default App;
