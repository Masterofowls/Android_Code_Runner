import { useEffect, useState } from 'react';
const DEFAULT_SETTINGS = {
    theme: 'dark',
    fontSize: 13,
    autoFormat: true,
    showLineNumbers: true,
};
const STORAGE_KEY = 'code-runner-settings';
export function useAppSettings() {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Load settings from localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            }
            catch (err) {
                console.error('Failed to load settings:', err);
            }
        }
        setIsLoading(false);
    }, []);
    const updateSettings = (newSettings) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };
    return { settings, updateSettings, isLoading };
}
