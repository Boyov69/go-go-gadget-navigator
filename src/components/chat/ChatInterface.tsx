
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat, Message } from '@/contexts/ChatContext';
import { useAI } from '@/contexts/AIContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const { setIsProcessing, setIsListening, addToHistory } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

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
    // This will be handled by the existing voice assistant component
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
                <CardTitle className="text-lg font-medium">Chat with Go-Go AI Navigator</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden">
              {/* Messages container */}
              <div className="h-full overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <div className="mb-2 p-3 bg-primary/10 rounded-full">
                      <Mic className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm">Ask me anything about navigation or your travel needs!</p>
                    <p className="text-xs mt-2">Try saying "Navigate to Brussels" or "What's the fastest route to the airport?"</p>
                  </div>
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
                  className="rounded-full"
                  onClick={() => {/* Handle file upload */}}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    className="min-h-[40px] max-h-[120px] resize-none pr-10"
                    placeholder="Message Go-Go AI Navigator..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                </div>

                <Button
                  variant="outline" 
                  size="icon"
                  className="rounded-full"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4" />
                </Button>

                <Button
                  className="rounded-full"
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
