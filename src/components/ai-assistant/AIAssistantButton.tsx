
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Mic, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';

interface AIAssistantButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ onClick, isOpen }) => {
  const { isProcessing, isListening } = useAI();
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Periodically pulse the button to draw attention (if not active)
  useEffect(() => {
    if (isOpen || isProcessing || isListening) return;
    
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen, isProcessing, isListening]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: pulseAnimation ? [1, 1.1, 1] : 1, 
          opacity: 1 
        }}
        transition={{ 
          duration: pulseAnimation ? 2 : 0.3,
          ease: "easeInOut"
        }}
        className="fixed bottom-24 right-6 z-50"
      >
        <Button
          className={`rounded-full shadow-lg size-14 ${
            isProcessing || isListening ? 'bg-primary' : 'bg-gradient-to-r from-blue-500 to-purple-600'
          }`}
          onClick={onClick}
          aria-label="AI Assistant"
          title="Open AI Assistant (Alt+A)"
        >
          {isProcessing ? (
            <Loader2 className="size-6 animate-spin text-white" />
          ) : isListening ? (
            <Mic className="size-6 animate-pulse text-white" />
          ) : (
            <Bot className="size-6 text-white" />
          )}

          {(isProcessing || isListening) && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(79, 70, 229, 0.4)', '0 0 0 10px rgba(79, 70, 229, 0)']
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5
              }}
            />
          )}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistantButton;
