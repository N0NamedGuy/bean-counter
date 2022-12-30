import { useEffect, useState } from 'react';

function useStorageState(stateName, defaultVal) {
    const key = `storedState.${stateName}`;

    const loadStoredState = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultVal;
        } catch (e) {
            console.error(`Couldn't get stored state ${stateName}`, e);
            return defaultVal;
        }
    }

    const [storedValue, setStoredValue] = useState(() => loadStoredState());

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (e) {
            console.error(`Couldn't persist (save) state ${stateName}`, e);
        }
    };

    useEffect((e) => {
        loadStoredState();
    }, [stateName]);

    return [storedValue, setValue];
}

export { useStorageState };