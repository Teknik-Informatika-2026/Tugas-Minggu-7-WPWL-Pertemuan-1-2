import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './MainContent.css';

const MainContent = () => {
  const { theme, isDarkMode, isLightMode, toggleTheme } = useTheme();

  return React.createElement(
    'main',
    { className: `main-content-wrapper ${theme}` },
    React.createElement(
      'section',
      { className: 'content-section' },
      React.createElement('h2', { className: 'section-title' }, 'API Demonstration'),
      React.createElement(
        'div',
        {
          className: 'info-card',
          onClick: toggleTheme,
          title: 'Click to toggle theme',
        },
        React.createElement(
          'div',
          { className: 'card-header' },
          React.createElement('h3', null, 'Theme Information')
        ),
        React.createElement(
          'div',
          { className: 'info-details' },
          React.createElement(
            'p',
            null,
            'Current Theme: ',
            React.createElement('strong', null, theme === 'dark' ? 'Dark Mode' : 'Light Mode')
          ),
          React.createElement(
            'p',
            null,
            'Is Dark Mode: ',
            React.createElement('strong', null, isDarkMode ? 'Yes' : 'No')
          ),
          React.createElement(
            'p',
            null,
            'Is Light Mode: ',
            React.createElement('strong', null, isLightMode ? 'Yes' : 'No')
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'features-container' },
        React.createElement(
          'ul',
          { className: 'feature-list' },
          React.createElement('li', null, 'No prop drilling'),
          React.createElement('li', null, 'Global state management'),
          React.createElement('li', null, 'Clean component structure'),
          React.createElement('li', null, 'Easy to maintain')
        )
      )
    )
  );
};

export default MainContent;
