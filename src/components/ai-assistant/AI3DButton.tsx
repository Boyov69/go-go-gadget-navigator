
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import BotCanvas from './3d/BotCanvas';
import KeyboardShortcutHints from './KeyboardShortcutHints';
import StatusIndicator from './ui/StatusIndicator';

interface AI3DButtonProps {
  onClick: () => void;
  isOpen: boolean;
  isChatOpen?: boolean;
}

const AI3DButton: React.FC<AI3DButtonProps> = ({ onClick, isOpen, isChatOpen = false }) => {
  const { isProcessing, isListening } = useAI();
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Periodically pulse the button to draw attention
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

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="relative">
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <motion.div
              className="w-14 h-14 cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                transition: { 
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
            >
              <div className="w-full h-full rounded-full shadow-lg overflow-hidden">
                <BotCanvas 
                  isProcessing={isProcessing} 
                  isListening={isListening}
                  isChatOpen={isChatOpen}
                  pulseAnimation={pulseAnimation}
                />
              </div>
              
              {/* Status indicator */}
              <StatusIndicator active={isProcessing || isListening} />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-background p-2 border shadow-lg">
            <div className="text-sm">
              {getTooltipText()}
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Keyboard shortcut hints */}
        <AnimatePresence>
          <KeyboardShortcutHints isVisible={!isOpen && !isChatOpen} />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AI3DButton;
