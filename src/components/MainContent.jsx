import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './MainContent.css';

const MainContent = () => {
  const { theme, isDarkMode, isLightMode, toggleTheme } = useTheme();

  return (
    <main className={`main-content-wrapper ${theme}`}>
      <section className="content-section">
        <h2 className="section-title">API Demonstration</h2>

        <div className="info-card" onClick={toggleTheme} title="Click to toggle theme">
          <div className="card-header">
            <h3>Theme Information</h3>
          </div>

          <div className="info-details">
            <p>
              Current Theme: <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
            </p>
            <p>
              Is Dark Mode: <strong>{isDarkMode ? 'Yes' : 'No'}</strong>
            </p>
            <p>
              Is Light Mode: <strong>{isLightMode ? 'Yes' : 'No'}</strong>
            </p>
          </div>
        </div>

        <div className="features-container">
          <ul className="feature-list">
            <li>No prop drilling</li>
            <li>Global state management</li>
            <li>Clean component structure</li>
            <li>Easy to maintain</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
