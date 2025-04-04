
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

// Component imports
import ChatHeader from './header/ChatHeader';
import ChatMessageList from './messages/ChatMessageList';
import ChatInput from './input/ChatInput';
import { useChatLogic } from './hooks/useChatLogic';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useChatLogic({ onClose });

  useEffect(() => {
    // Auto-focus input when chat opens
    if (isOpen) {
      // Using a small delay for animation to complete
      const timer = setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) textarea.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <Card className="w-full max-w-md h-[80vh] flex flex-col shadow-lg border-primary/20">
            {/* Chat Header */}
            <ChatHeader onClose={onClose} handleClearChat={handleClearChat} />

            {/* Messages Container */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ChatMessageList 
                messages={messages}
                isTyping={isTyping}
                showEmptyState={showEmptyState}
                showWelcome={showWelcome}
                setInput={setInput}
              />
            </CardContent>

            {/* Input Area */}
            <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              handleVoiceInput={handleVoiceInput}
            />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
