
import React from 'react';
import { motion } from 'framer-motion';

interface KeyboardShortcutHintsProps {
  isVisible: boolean;
}

const KeyboardShortcutHints: React.FC<KeyboardShortcutHintsProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.2 }}
      className="absolute top-16 right-0 bg-background shadow-md rounded-md p-3 z-50 border"
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
  );
};

export default KeyboardShortcutHints;
