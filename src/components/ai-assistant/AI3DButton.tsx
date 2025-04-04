import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import BotCanvas from './3d/BotCanvas';
import StatusIndicator from './ui/StatusIndicator';
import { Bot } from 'lucide-react';

interface AI3DButtonProps {
  onClick: () => void;
  isOpen: boolean;
  isChatOpen?: boolean;
}

const AI3DButton: React.FC<AI3DButtonProps> = ({ onClick, isOpen, isChatOpen = false }) => {
  const { isProcessing, isListening } = useAI();
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showHints, setShowHints] = useState(true);
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    const handleWebGLContextLost = () => {
      console.log("WebGL context lost, switching to fallback mode");
      setUseWebGL(false);
    };
    
    window.addEventListener('webglcontextlost', handleWebGLContextLost);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleWebGLContextLost);
    };
  }, []);

  useEffect(() => {
    if (isOpen || isProcessing || isListening) return;
    
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen, isProcessing, isListening]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHints(false);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, []);

  const getTooltipText = () => {
    if (isChatOpen) return "Close chat";
    if (isOpen) return "Switch to chat mode";
    return "Open AI Assistant (Alt+A for voice, Alt+C for chat)";
  };

  const handleButtonClick = () => {
    setShowHints(false);
    onClick();
  };

  const FallbackButton = () => (
    <motion.div
      className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
      whileHover={{ 
        scale: 1.1,
        transition: { 
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror"
        }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Bot className="h-8 w-8 text-white" />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 right-4 z-50 w-14 h-14"
    >
      <div className="relative">
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <motion.div
              className="w-full h-full cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                transition: { 
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
            >
              <div className="w-full h-full rounded-full shadow-lg overflow-hidden">
                {useWebGL ? (
                  <BotCanvas 
                    isProcessing={isProcessing} 
                    isListening={isListening}
                    isChatOpen={isChatOpen}
                    pulseAnimation={pulseAnimation}
                  />
                ) : (
                  <FallbackButton />
                )}
              </div>
              
              <StatusIndicator active={isProcessing || isListening} />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-background p-2 border shadow-lg">
            <div className="text-sm">
              {getTooltipText()}
            </div>
          </TooltipContent>
        </Tooltip>
        
        <AnimatePresence>
          {showHints && !isOpen && !isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-24 right-0 bg-background shadow-md rounded-md p-3 z-40 border"
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
  );
};

export default AI3DButton;
