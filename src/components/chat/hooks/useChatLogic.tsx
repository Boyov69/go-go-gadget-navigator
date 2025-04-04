
import { useState } from 'react';
import { Message, useChat } from '@/contexts/ChatContext';
import { useAI } from '@/contexts/AIContext';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';

interface UseChatLogicProps {
  onClose: () => void;
}

export const useChatLogic = ({ onClose }: UseChatLogicProps) => {
  const { messages, addMessage, isTyping, setIsTyping, clearMessages } = useChat();
  const { setIsProcessing, setIsListening, addToHistory } = useAI();
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(true);

  // Effect to hide empty state when messages exist
  useState(() => {
    if (messages.length > 0) {
      setShowEmptyState(false);
    }
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);
    setIsProcessing(true);
    addToHistory(userMessage.content);
    setShowWelcome(false);

    try {
      const result = await AICommandProcessor.processCommand(userMessage.content);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result,
        role: 'assistant',
        timestamp: new Date(),
      };

      addMessage(aiResponse);

      // Optional: Text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error processing chat message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process that request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    onClose();
    // This will trigger voice mode
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'a',
        altKey: true
      }));
    }, 300);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleClearChat = () => {
    clearMessages();
    setShowEmptyState(true);
    setShowWelcome(true);
  };

  return {
    messages,
    isTyping,
    input,
    setInput,
    showWelcome,
    showEmptyState,
    handleSend,
    handleVoiceInput,
    handleKeyDown,
    handleClearChat
  };
};
