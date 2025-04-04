
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatWelcomeProps {
  setInput: (input: string) => void;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ setInput }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-6"
    >
      <div className="mb-3 p-4 bg-primary/10 rounded-full">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">Welcome to Go-Go AI Navigator!</h3>
      <p className="text-sm mb-4">Ask me anything about navigation, transport options, or travel planning.</p>
      
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs mt-2">
        <Button variant="outline" size="sm" className="text-left justify-start" onClick={() => setInput("Find the fastest route to Brussels")}>
          Fastest route to Brussels
        </Button>
        <Button variant="outline" size="sm" className="text-left justify-start" onClick={() => setInput("Show me public transport options")}>
          Public transport options
        </Button>
        <Button variant="outline" size="sm" className="text-left justify-start" onClick={() => setInput("What transport services are available?")}>
          Available transport
        </Button>
        <Button variant="outline" size="sm" className="text-left justify-start" onClick={() => setInput("Help me plan a journey")}>
          Plan a journey
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatWelcome;
