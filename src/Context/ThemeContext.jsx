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
        // Usa el tema guardado en localStorage o 'DARK' por defecto
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'DARK';
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'DARK' ? 'LIGHT' : 'DARK';
            localStorage.setItem('theme', newTheme);
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