
import React, { createContext, useContext, useState, ReactNode } from 'react';

type NavigationMode = 'manual' | 'ai';

interface NavigationModeContextType {
  mode: NavigationMode;
  setMode: (mode: NavigationMode) => void;
  toggleMode: () => void;
}

const NavigationModeContext = createContext<NavigationModeContextType | undefined>(undefined);

export const NavigationModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<NavigationMode>('manual');

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'manual' ? 'ai' : 'manual');
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
