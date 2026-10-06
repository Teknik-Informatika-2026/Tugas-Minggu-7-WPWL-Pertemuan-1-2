import React, { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

// Action Types
const THEME_ACTIONS = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    SET_THEME: 'SET_THEME',
    SET_PRIMARY_COLOR: 'SET_PRIMARY_COLOR',
    SET_SECONDARY_COLOR: 'SET_SECONDARY_COLOR',
    RESET_THEME: 'RESET_THEME'
};

// Initial state
const initialState = {
    mode: 'light',
    themes: {
        light: {
            primary: '#007bff',
            secondary: '#6c757d',
            background: '#ffffff',
            surface: '#f8f9fa',
            text: '#333333',
            textSecondary: '#666666',
            border: '#dee2e6',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545'
        },
        dark: {
            primary: '#0d6efd',
            secondary: '#5a6268',
            background: '#1a1a1a',
            surface: '#2d2d2d',
            text: '#ffffff',
            textSecondary: '#cccccc',
            border: '#444444',
            success: '#218838',
            warning: '#e0a800',
            error: '#c82333'
        }
    },
    colors: {}
};

// Set initial colors
initialState.colors = initialState.themes[initialState.mode];

// Theme reducer
const themeReducer = (state, action) => {
    console.log('🎨 Theme Reducer:', action.type, action.payload);

    switch (action.type) {
        case THEME_ACTIONS.TOGGLE_THEME: {
            const newMode = state.mode === 'light' ? 'dark' : 'light';

            return {
                ...state,
                mode: newMode,
                colors: state.themes[newMode]
            };
        }

        case THEME_ACTIONS.SET_THEME:
            if (!state.themes[action.payload]) {
                console.warn('⚠️ Unknown theme:', action.payload);
                return state;
            }

            return {
                ...state,
                mode: action.payload,
                colors: state.themes[action.payload]
            };

        case THEME_ACTIONS.SET_PRIMARY_COLOR:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    primary: action.payload
                }
            };

        case THEME_ACTIONS.SET_SECONDARY_COLOR:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    secondary: action.payload
                }
            };

        case THEME_ACTIONS.RESET_THEME:
            return {
                ...initialState,
                mode: action.payload || initialState.mode,
                colors:
                    initialState.themes[action.payload] ||
                    initialState.themes[initialState.mode]
            };

        default:
            console.warn('⚠️ Unknown action type:', action.type);
            return state;
    }
};

// Create Context
export const AdvancedThemeContext = createContext();

// Provider Component
export const AdvancedThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    console.log('🎨 AdvancedThemeProvider state:', state);

    // Memoized actions
    const actions = useMemo(() => ({
        toggleTheme: () => {
            console.log('🔄 Dispatching TOGGLE_THEME');
            dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
        },

        setTheme: (theme) => {
            console.log('🎨 Dispatching SET_THEME:', theme);
            dispatch({
                type: THEME_ACTIONS.SET_THEME,
                payload: theme
            });
        },

        setPrimaryColor: (color) => {
            console.log('🎨 Dispatching SET_PRIMARY_COLOR:', color);
            dispatch({
                type: THEME_ACTIONS.SET_PRIMARY_COLOR,
                payload: color
            });
        },

        setSecondaryColor: (color) => {
            console.log('🎨 Dispatching SET_SECONDARY_COLOR:', color);
            dispatch({
                type: THEME_ACTIONS.SET_SECONDARY_COLOR,
                payload: color
            });
        },

        resetTheme: (theme) => {
            console.log('🔄 Dispatching RESET_THEME:', theme);
            dispatch({
                type: THEME_ACTIONS.RESET_THEME,
                payload: theme
            });
        }
    }), []);

    // Memoized context value
    const contextValue = useMemo(() => ({
        // State
        mode: state.mode,
        colors: state.colors,
        themes: state.themes,

        // Computed values
        isDark: state.mode === 'dark',
        isLight: state.mode === 'light',
        isCustom: !['light', 'dark'].includes(state.mode),

        // Actions
        ...actions
    }), [state.mode, state.colors, state.themes, actions]);

    // Apply theme to body
    useEffect(() => {
        console.log('🎨 Applying theme to body:', state.mode);

        if (state.colors) {
            document.body.style.backgroundColor = state.colors.background;
            document.body.style.color = state.colors.text;
        }
    }, [state.mode, state.colors]);

    return (
        <AdvancedThemeContext.Provider value={contextValue}>
            <div
                className={`theme-app theme-${state.mode}`}
                style={{
                    backgroundColor: state.colors?.background || '#ffffff',
                    color: state.colors?.text || '#333333',
                    minHeight: '100vh',
                    transition: 'all 0.3s ease'
                }}
            >
                {children}
            </div>
        </AdvancedThemeContext.Provider>
    );
};

// Custom Hook
export const useAdvancedTheme = () => {
    const context = useContext(AdvancedThemeContext);

    if (context === undefined) {
        throw new Error(
            'useAdvancedTheme must be used within an AdvancedThemeProvider\n' +
            '💡 SOLUTION: Wrap your app with <AdvancedThemeProvider> in App.js'
        );
    }

    return context;
};

export default AdvancedThemeContext;