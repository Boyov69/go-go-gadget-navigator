
import { useEffect } from 'react';

interface AssistantKeyboardShortcutsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

export const useAssistantKeyboardShortcuts = ({
  isOpen,
  setIsOpen,
  isChatOpen,
  setIsChatOpen
}: AssistantKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt+A to toggle AI Assistant
      if (e.altKey && e.key === 'a') {
        if (isChatOpen) {
          setIsChatOpen(false);
        } else {
          setIsOpen(!isOpen);
        }
      }
      
      // Alt+C to toggle Chat Interface
      if (e.altKey && e.key === 'c') {
        setIsChatOpen(!isChatOpen);
        if (isOpen) setIsOpen(false);
      }
      
      // Escape to close if open
      if (e.key === 'Escape') {
        if (isChatOpen) {
          setIsChatOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isChatOpen, setIsOpen, setIsChatOpen]);
};
