import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

// Types
export interface AppState {
  theme: 'light' | 'dark';
}

interface AppStoreContextType {
  state: AppState;
  toggleTheme: () => void;
}

// Create context
const AppStoreContext = createContext<AppStoreContextType | undefined>(undefined);

// Storage key
const STORAGE_KEY = 'module-federation-theme';

// Initial state
const getInitialState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('📦 Loaded theme from localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }

  return {
    theme: 'light',
  };
};

// Save state to localStorage
const saveState = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log('💾 Saved theme to localStorage:', state);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

// Provider component
export const AppStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(getInitialState);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Poll localStorage every 500ms to check for changes from other apps
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const storedState = JSON.parse(stored);
          // Only update if the theme is different
          if (storedState.theme !== state.theme) {
            console.log('🔄 Detected theme change from other app:', storedState);
            setState(storedState);
          }
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [state.theme]); // Re-create interval when theme changes

  const value: AppStoreContextType = {
    state,
    toggleTheme,
  };

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

// Custom hook to use the store
export const useAppStore = (): AppStoreContextType => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }
  return context;
};

// Export types
export type { AppStoreContextType };
