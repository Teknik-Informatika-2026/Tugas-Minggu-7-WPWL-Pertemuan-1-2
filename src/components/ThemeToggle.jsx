import React from 'react';
import { useAdvancedTheme } from '../context/AdvancedThemeContext.jsx';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { mode, toggleTheme, isDark, colors } = useAdvancedTheme();

  const handleClick = () => {
    console.log('ThemeToggle clicked, current theme:', mode);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="theme-toggle-btn"
      style={{
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
        borderColor: colors?.primary || (isDark ? '#38bdf8' : '#007bff')
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="toggle-icon">{isDark ? '☀️' : '🌙'}</span>
      <span className="toggle-text">{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
    </button>
  );
};

export default ThemeToggle;