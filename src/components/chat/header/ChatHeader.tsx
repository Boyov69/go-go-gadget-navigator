
import React from 'react';
import { Bot, Sparkles, ArrowLeft, X } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatHeaderProps {
  onClose: () => void;
  handleClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, handleClearChat }) => {
  return (
    <CardHeader className="p-4 border-b">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Bot className="h-5 w-5 text-primary" /> 
          <span>Go-Go AI Navigator</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center">
                <Sparkles className="h-3 w-3 mr-1" /> Chat
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with the AI assistant</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleClearChat} aria-label="Clear chat">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
