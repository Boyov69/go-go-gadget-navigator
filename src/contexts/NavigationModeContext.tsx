
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type NavigationMode = 'manual' | 'ai';

interface NavigationModeContextType {
  mode: NavigationMode;
  setMode: (mode: NavigationMode) => void;
  toggleMode: () => void;
}

const NavigationModeContext = createContext<NavigationModeContextType | undefined>(undefined);

export const NavigationModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial mode from localStorage, default to 'manual' if not found
  const [mode, setMode] = useState<NavigationMode>(() => {
    const savedMode = localStorage.getItem('navigationMode') as NavigationMode | null;
    return savedMode === 'ai' ? 'ai' : 'manual';
  });

  // Save mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('navigationMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'manual' ? 'ai' : 'manual';
      return newMode;
    });
  };

  return (
    <NavigationModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </NavigationModeContext.Provider>
  );
};

export const useNavigationMode = () => {
  const context = useContext(NavigationModeContext);
  if (context === undefined) {
    throw new Error('useNavigationMode must be used within a NavigationModeProvider');
  }
  return context;
};
