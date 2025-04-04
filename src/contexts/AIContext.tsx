
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  lastCommand: string;
  setLastCommand: (command: string) => void;
  commandHistory: string[];
  addToHistory: (command: string) => void;
  clearHistory: () => void;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  preferredMode: 'chat' | 'voice';
  setPreferredMode: (mode: 'chat' | 'voice') => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [preferredMode, setPreferredMode] = useState<'chat' | 'voice'>('voice');

  const addToHistory = (command: string) => {
    setCommandHistory(prev => {
      // Avoid duplicate consecutive commands
      if (prev.length > 0 && prev[prev.length - 1] === command) {
        return prev;
      }
      // Keep last 10 commands
      return [...prev, command].slice(-10);
    });
  };
  
  const clearHistory = () => {
    setCommandHistory([]);
  };

  return (
    <AIContext.Provider value={{
      isProcessing,
      setIsProcessing,
      lastCommand,
      setLastCommand,
      commandHistory,
      addToHistory,
      clearHistory,
      isListening,
      setIsListening,
      preferredMode,
      setPreferredMode
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
