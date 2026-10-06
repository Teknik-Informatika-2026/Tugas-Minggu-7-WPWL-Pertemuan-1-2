import React, { createContext, useState, useContext, useEffect }
    from 'react';

const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Toggle function
    const toggleTheme = () => {
        console.log('🔄 Toggle theme called, current theme:', theme);

        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            console.log('🔄 Changing theme to:', newTheme);
            return newTheme;
        });
    };

    // Direct set theme
    const setThemeDirect = (newTheme) => {
        console.log('🎨 Setting theme to:', newTheme);
        setTheme(newTheme);
    };

    // Context value
    const contextValue = {
        theme,
        toggleTheme,
        setTheme: setThemeDirect,
        isDark: theme === 'dark',
        isLight: theme === 'light'
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={`theme-wrapper theme-${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

// Custom Hook
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

export default ThemeContext;