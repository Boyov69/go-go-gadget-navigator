
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X, Bot, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat, Message } from '@/contexts/ChatContext';
import { useAI } from '@/contexts/AIContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const { messages, addMessage, isTyping, setIsTyping, clearMessages } = useChat();
  const { setIsProcessing, setIsListening, addToHistory } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (messages.length > 0) {
      setShowEmptyState(false);
    }
  }, [messages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);
    setIsProcessing(true);
    addToHistory(userMessage.content);
    setShowWelcome(false);

    try {
      const result = await AICommandProcessor.processCommand(userMessage.content);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result,
        role: 'assistant',
        timestamp: new Date(),
      };

      addMessage(aiResponse);

      // Optional: Text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error processing chat message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process that request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    onClose();
    // This will trigger voice mode
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'a',
        altKey: true
      }));
    }, 300);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    clearMessages();
    setShowEmptyState(true);
    setShowWelcome(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <Card className="w-full max-w-md h-[80vh] flex flex-col shadow-lg border-primary/20">
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

            <CardContent className="flex-1 p-0 overflow-hidden">
              {/* Messages container */}
              <div className="h-full overflow-y-auto p-4 space-y-4">
                {showEmptyState && (
                  <AnimatePresence>
                    {showWelcome && (
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
            </CardContent>

            {/* Input area */}
            <div className="border-t p-4">
              <div className="flex items-end space-x-2">
                <Button
                  variant="outline" 
                  size="icon"
                  className="rounded-full flex-shrink-0"
                  onClick={() => {/* Handle file upload */}}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    className="min-h-[40px] max-h-[120px] resize-none pr-10"
                    placeholder="Ask the AI Navigator..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <Button
                  variant="outline" 
                  size="icon"
                  className="rounded-full flex-shrink-0"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4" />
                </Button>

                <Button
                  className="rounded-full flex-shrink-0"
                  disabled={!input.trim()}
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
