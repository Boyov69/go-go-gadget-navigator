
import React from 'react';
import { motion } from 'framer-motion';

interface StatusIndicatorProps {
  active: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ active }) => {
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-primary"
      animate={{ 
        boxShadow: ['0 0 0 0 rgba(79, 70, 229, 0.4)', '0 0 0 10px rgba(79, 70, 229, 0)']
      }}
      transition={{ 
        repeat: Infinity,
        duration: 1.5
      }}
    />
  );
};

export default StatusIndicator;
