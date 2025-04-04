
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Mic, Loader2, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AIAssistantButtonProps {
  onClick: () => void;
  isOpen: boolean;
  isChatOpen?: boolean;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ 
  onClick, 
  isOpen, 
  isChatOpen = false 
}) => {
  const { isProcessing, isListening } = useAI();
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Periodically pulse the button to draw attention (if not active)
  useEffect(() => {
    if (isOpen || isProcessing || isListening) return;
    
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen, isProcessing, isListening]);

  // Hide the tooltip after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const getTooltipText = () => {
    if (isChatOpen) return "Close chat";
    if (isOpen) return "Switch to chat mode";
    return "Open AI Assistant (Alt+A for voice, Alt+C for chat)";
  };

  const getIcon = () => {
    if (isProcessing) return <Loader2 className="size-6 animate-spin text-white" />;
    if (isListening) return <Mic className="size-6 animate-pulse text-white" />;
    if (isChatOpen) return <X className="size-6 text-white" />;
    return <Bot className="size-6 text-white" />;
  };

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
        <div className="relative">
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <Button
                className={`rounded-full shadow-lg size-14 ${
                  isProcessing || isListening ? 'bg-primary' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                } hover:shadow-xl transition-all duration-300`}
                onClick={onClick}
                aria-label={getTooltipText()}
              >
                {getIcon()}
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
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-background p-2 border shadow-lg">
              <div className="text-sm">
                {getTooltipText()}
              </div>
            </TooltipContent>
          </Tooltip>
          
          <AnimatePresence>
            {!isOpen && !isChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-20 right-0 bg-background shadow-md rounded-md p-3 z-50 border"
              >
                <div className="flex flex-col gap-2 items-center text-sm">
                  <div className="flex gap-2 items-center">
                    <kbd className="px-2 py-1 text-xs rounded border bg-muted">Alt+A</kbd> 
                    <span>for voice</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <kbd className="px-2 py-1 text-xs rounded border bg-muted">Alt+C</kbd> 
                    <span>for chat</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistantButton;
