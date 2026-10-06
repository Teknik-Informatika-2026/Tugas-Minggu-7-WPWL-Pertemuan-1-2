import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdvancedThemeContext } from './AdvancedThemeContext.jsx';

// Create context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Cek localStorage yang disimpan, default 'light'
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Terapkan class theme ke body element dan simpan di localStorage
  useEffect(() => {
    document.body.className = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function untuk toggle theme (merubah state)
  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function untuk set theme langsung
  const setTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };

  const isDarkMode = theme === 'dark';
  const isLightMode = theme === 'light';

  const value = {
    theme,
    toggleTheme,
    setTheme,
    isDarkMode,
    isLightMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  const advContext = useContext(AdvancedThemeContext);

  if (context) {
    return context;
  }
  if (advContext) {
    return {
      theme: advContext.mode,
      toggleTheme: advContext.toggleTheme,
      setTheme: advContext.setTheme,
      isDarkMode: advContext.isDark,
      isLightMode: advContext.isLight,
    };
  }
  throw new Error('useTheme must be used within a ThemeProvider or AdvancedThemeProvider');
};

export default ThemeContext;
