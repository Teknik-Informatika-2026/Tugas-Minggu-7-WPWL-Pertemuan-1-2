import React, { useState } from 'react';
import { useAdvancedTheme } from '../context/AdvancedThemeContext.jsx';
import './AdvancedThemeControls.css';

const AdvancedThemeControls = () => {
    const {
        mode,
        colors,
        themes,
        isDark,
        isLight,
        toggleTheme,
        setTheme,
        setPrimaryColor,
        resetTheme
    } = useAdvancedTheme();

    const [customPrimary, setCustomPrimary] =
        useState(colors?.primary || '#007bff');

    const predefinedThemes = [
        { name: 'light', label: 'Light Theme' },
        { name: 'dark', label: 'Dark Theme' }
    ];

    const colorPresets = [
        '#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1',
        '#e83e8c', '#fd7e14', '#20c997', '#17a2b8'
    ];

    const handlePrimaryColorChange = (color) => {
        setPrimaryColor(color);
        setCustomPrimary(color);
    };

    const handleReset = () => {
        resetTheme('light');
        setCustomPrimary('#007bff');
    };

    return (
        <div
            className="advanced-theme-controls"
            style={{
                background: colors?.surface || '#f8f9fa',
                color: colors?.text || '#333333',
                border: '1px solid ' + (colors?.border || '#dee2e6')
            }}
        >
            <h3 style={{ color: colors?.primary || '#007bff' }}>
                🎨 Advanced Theme Controls
            </h3>

            {/* Theme Selection */}
            <div className="control-group">
                <label>Predefined Themes:</label>
                <div className="theme-buttons">
                    {predefinedThemes.map(theme => (
                        <button
                            key={theme.name}
                            onClick={() => setTheme(theme.name)}
                            className={`theme-btn ${mode === theme.name ? 'active' : ''}`}
                            style={{
                                background: mode === theme.name
                                    ? (colors?.primary || '#007bff')
                                    : (colors?.background || '#333333'),
                                color: mode === theme.name
                                    ? '#fff'
                                    : (colors?.text || '#333333'),
                                border: '1px solid ' + (colors?.border || '#dee2e6')
                            }}
                        >
                            {theme.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Toggle */}
            <div className="control-group">
                <label>Quick Action:</label>
                <div className="action-buttons">
                    <button
                        onClick={toggleTheme}
                        className="action-btn"
                        style={{
                            background: colors?.primary || '#007bff',
                            color: '#fff'
                        }}
                    >
                        {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
                    </button>

                    <button
                        onClick={handleReset}
                        className="action-btn"
                        style={{
                            background: colors?.error || '#dc3545',
                            color: '#fff'
                        }}
                    >
                        🔄 Reset Theme
                    </button>
                </div>
            </div>

            {/* Color Customization */}
            <div className="control-group">
                <label>Primary Color:</label>

                <div className="color-picker">
                    <input
                        type="color"
                        value={customPrimary}
                        onChange={(e) => handlePrimaryColorChange(e.target.value)}
                        className="color-input"
                    />

                    <span
                        className="color-value"
                        style={{ color: colors?.primary }}
                    >
                        {colors?.primary}
                    </span>
                </div>

                <div className="color-presets">
                    {colorPresets.map(color => (
                        <button
                            key={color}
                            onClick={() => handlePrimaryColorChange(color)}
                            className="color-preset"
                            style={{ background: color }}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            {/* Theme Info */}
            <div className="theme-info">
                <h4>Current Theme:</h4>

                <div className="info-grid">
                    <div>
                        <strong>Mode:</strong>
                        <span>{mode}</span>
                    </div>

                    <div>
                        <strong>Primary:</strong>
                        <span style={{ color: colors?.primary }}>
                            {colors?.primary}
                        </span>
                    </div>

                    <div>
                        <strong>Background:</strong>
                        <span>{colors?.background}</span>
                    </div>

                    <div>
                        <strong>Text:</strong>
                        <span>{colors?.text}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedThemeControls;