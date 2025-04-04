
import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Message } from '@/contexts/ChatContext';
import MessageBubble from '../MessageBubble';
import TypingIndicator from '../TypingIndicator';
import ChatWelcome from '../welcome/ChatWelcome';

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
  showEmptyState: boolean;
  showWelcome: boolean;
  setInput: (input: string) => void;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ 
  messages, 
  isTyping, 
  showEmptyState,
  showWelcome,
  setInput
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {showEmptyState && (
        <AnimatePresence>
          {showWelcome && (
            <ChatWelcome setInput={setInput} />
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </AnimatePresence>

      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
