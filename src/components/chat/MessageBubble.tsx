
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/contexts/ChatContext';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex ${isAssistant ? 'flex-row' : 'flex-row-reverse'} items-start gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8 mt-1">
          {isAssistant ? (
            <>
              <AvatarImage src="/assets/ai-avatar.png" alt="AI Assistant" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </>
          )}
        </Avatar>
        
        <div className="flex flex-col">
          <div 
            className={`p-3 rounded-lg ${
              isAssistant 
                ? 'bg-muted text-foreground rounded-tl-none' 
                : 'bg-primary text-primary-foreground rounded-tr-none'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className={`text-xs mt-1 text-muted-foreground ${isAssistant ? 'text-left' : 'text-right'}`}>
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
