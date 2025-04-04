
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Bot, X } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';

interface AIModeTutorialProps {
  onClose?: () => void;
}

const AIModeTutorial: React.FC<AIModeTutorialProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { preferredMode } = useAI();
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 my-4 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2" 
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        AI Navigation Mode Tutorial
      </h3>
      
      <p className="text-sm text-muted-foreground mt-2 mb-4">
        {preferredMode === 'voice' 
          ? 'Use voice commands to navigate the app. Tap the AI button or press Alt+A to activate the voice assistant.' 
          : 'Use the chat interface to navigate and control the app. Press Alt+C to open the chat.'}
      </p>
      
      <div className="bg-muted p-3 rounded-md">
        <h4 className="font-medium mb-1">Try saying or typing:</h4>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
          <li>"Navigate to settings"</li>
          <li>"Open the dashboard"</li>
          <li>"Show me nearby stations"</li>
          <li>"Search for restaurants in Berlin"</li>
          <li>"Switch to public transport tab"</li>
        </ul>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          size="sm"
          onClick={handleClose}
          variant="outline"
        >
          Got it
        </Button>
      </div>
    </div>
  );
};

export default AIModeTutorial;
