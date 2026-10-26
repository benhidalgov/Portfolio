import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Preferencia guardada, o la del sistema en la primera visita.
        // Se aplica sincrónicamente para evitar el destello (FOUC) al cargar.
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch { /* storage bloqueado */ }
        const initial = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'LIGHT' : 'DARK');
        document.documentElement.setAttribute('data-theme', initial.toLowerCase());
        return initial;
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'DARK' ? 'LIGHT' : 'DARK';
            try { localStorage.setItem('theme', newTheme); } catch { /* storage bloqueado */ }
            return newTheme;
        });
    };

    // 🌩️ Aplica el tema: Alta Tormenta (dark) o Luz Tormentosa (light)
    useEffect(() => {
        // Esto aplica html[data-theme="dark"] o html[data-theme="light"]
        document.documentElement.setAttribute('data-theme', theme.toLowerCase());
    }, [theme]);

    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};