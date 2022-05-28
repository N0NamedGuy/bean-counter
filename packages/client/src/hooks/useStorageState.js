import { useState } from 'react';

function useStorageState(stateName, defaultVal) {
    const key = `storedState.${stateName}`;

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultVal;
        } catch (e) {
            console.error(`Couldn't get stored state ${stateName}`, e);
            return defaultVal;
        }
    });

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

    return [storedValue, setValue];
}

export { useStorageState };