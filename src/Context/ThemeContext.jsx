import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// 1. Crea el Contexto
const ThemeContext = createContext();

// 2. Hook personalizado para usar el Contexto más fácilmente
export const useTheme = () => useContext(ThemeContext);

// 3. Provider que maneja la lógica
export function ThemeProvider({ children }) {
    // Inicializa el tema basándose en localStorage o prefiere DARK por defecto
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme.toUpperCase() : 'DARK'; // Asegura que sea DARK o LIGHT
    });

    // Efecto para aplicar el tema al body cuando cambia
    useEffect(() => {
        // Aplica el atributo 'data-theme' al cuerpo del documento
        document.body.setAttribute('data-theme', theme.toLowerCase());
        // Guarda la preferencia en localStorage
        localStorage.setItem('theme', theme);
    }, [theme]); // Se ejecuta cada vez que 'theme' cambia

    const toggleTheme = () => {
        const newTheme = theme === 'DARK' ? 'LIGHT' : 'DARK';
        setTheme(newTheme);
    };

    // Objeto de valor que se pasa a los consumidores, optimizado con useMemo
    const value = useMemo(() => ({
        theme,
        toggleTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}