import { useEffect } from 'react';
import { useStorageState } from '../hooks/useStorageState';

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

export const useDarkMode = () => {
    const [isDarkModePreference, setIsDarkModePreference] = useStorageState('darkMode', 'system');

    useEffect(() => {
        const preferDarkChange = (mediaQuery) => {
            if (isDarkModePreference === 'system') {
                toggleColorScheme('dark', mediaQuery.matches);
            }
        }
        prefersDark.addEventListener('change', preferDarkChange);

        applyDarkMode(isDarkModePreference);

        return () => {
            prefersDark.removeEventListener('change', preferDarkChange);
        }
    }, [isDarkModePreference]);

    function applyDarkMode(darkModeType) {
        if (darkModeType === 'system') {
            toggleColorScheme(prefersDark.matches);
        } else if (darkModeType === 'dark') {
            toggleColorScheme(true);
        } else {
            toggleColorScheme(false);
        }
    }

    function setDarkMode(darkModeType) {
        applyDarkMode(darkModeType);
        setIsDarkModePreference(darkModeType);
    };

    // Add or remove the "dark" class based on if the media query matches
    function toggleColorScheme(shouldAdd) {
        document.body.classList.toggle('dark', shouldAdd);
    }

    return [isDarkModePreference, setDarkMode];
}