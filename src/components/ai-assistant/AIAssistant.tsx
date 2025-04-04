
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAI } from '@/contexts/AIContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ChatProvider } from '@/contexts/ChatContext';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';
import { Drawer } from '@/components/ui/drawer';
import { useAssistantKeyboardShortcuts } from '@/hooks/useAssistantKeyboardShortcuts';

// Component imports
import AIAssistantButton from './AIAssistantButton';
import ChatInterface from '@/components/chat/ChatInterface';
import AssistantDrawer from './AssistantDrawer';

const AIAssistant: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    isProcessing, setIsProcessing, 
    lastCommand, setLastCommand, 
    commandHistory, addToHistory,
    isListening, setIsListening,
    preferredMode, setPreferredMode
  } = useAI();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [response, setResponse] = useState<string>('');
  
  // Use the keyboard shortcuts hook
  useAssistantKeyboardShortcuts({
    isOpen,
    setIsOpen,
    isChatOpen,
    setIsChatOpen
  });
  
  // Process commands from voice assistant
  const handleCommandProcessed = async (command: string) => {
    setLastCommand(command);
    setIsProcessing(true);
    
    try {
      const result = await AICommandProcessor.processCommand(command);
      setResponse(result);
      addToHistory(command);
      
      // Speak the response (optional text-to-speech)
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error processing AI command:', error);
      toast({
        title: "Assistant Error",
        description: "Sorry, I couldn't process that request.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Stop speech synthesis when drawer closes
  useEffect(() => {
    if (!isOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  // Update preferred mode based on user interaction
  useEffect(() => {
    if (isOpen && !isChatOpen) {
      setPreferredMode('voice');
    } else if (isChatOpen && !isOpen) {
      setPreferredMode('chat');
    }
  }, [isOpen, isChatOpen, setPreferredMode]);

  // Show initial interface based on preferred mode
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      if (preferredMode === 'chat' && !isChatOpen && !isOpen) {
        setIsChatOpen(true);
      }
    }, 1000);
    return () => clearTimeout(initialDelay);
  }, [preferredMode, isChatOpen, isOpen]);

  const handleButtonClick = () => {
    // Toggle between chat and voice modes
    if (isChatOpen) {
      setIsChatOpen(false);
    } else if (isOpen) {
      setIsOpen(false);
      setIsChatOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <ChatProvider>
        {/* Floating assistant button */}
        <AIAssistantButton 
          onClick={handleButtonClick} 
          isOpen={isOpen} 
          isChatOpen={isChatOpen} 
        />
        
        {/* Chat Interface */}
        <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <AssistantDrawer 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            lastCommand={lastCommand}
            response={response}
            isProcessing={isProcessing}
            commandHistory={commandHistory}
            onListeningChange={setIsListening}
            isListening={isListening}
            onCommandProcessed={handleCommandProcessed}
          />
        </Drawer>
      </ChatProvider>
    </ErrorBoundary>
  );
};

export default AIAssistant;
