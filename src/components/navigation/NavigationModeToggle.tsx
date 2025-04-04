
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigationMode } from '@/contexts/NavigationModeContext';
import { Bot, Map } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAI } from '@/contexts/AIContext';

const NavigationModeToggle: React.FC = () => {
  const { mode, toggleMode } = useNavigationMode();
  const { preferredMode, setPreferredMode } = useAI();
  
  const isAIMode = mode === 'ai';
  
  const handleToggle = () => {
    toggleMode();
    // Update AI preferred mode when switching navigation mode
    if (mode === 'manual') {
      setPreferredMode('voice');
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-background/90 backdrop-blur-sm border shadow-sm">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <Map className={`h-4 w-4 mr-1 ${isAIMode ? 'text-muted-foreground' : 'text-primary'}`} />
            <span className={`text-xs font-medium ${isAIMode ? 'text-muted-foreground' : 'text-foreground'}`}>
              Manual
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Traditional navigation with buttons and menus</p>
        </TooltipContent>
      </Tooltip>
      
      <Switch 
        checked={isAIMode}
        onCheckedChange={handleToggle}
        aria-label="Toggle navigation mode"
      />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <Bot className={`h-4 w-4 mr-1 ${isAIMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium ${isAIMode ? 'text-foreground' : 'text-muted-foreground'}`}>
              AI
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Navigate using voice commands or chat</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default NavigationModeToggle;
