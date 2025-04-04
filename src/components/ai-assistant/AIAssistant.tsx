import React, { useState, useEffect } from 'react';
import VoiceAssistant from './VoiceAssistant';
import AIAssistantButton from './AIAssistantButton';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';
import { useToast } from '@/hooks/use-toast';
import { RocketIcon, Mic, X, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAI } from '@/contexts/AIContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { ChatProvider } from '@/contexts/ChatContext';
import ChatInterface from '@/components/chat/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

const AIAssistant: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    isProcessing, setIsProcessing, 
    lastCommand, setLastCommand, 
    commandHistory, addToHistory,
    isListening, setIsListening
  } = useAI();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [response, setResponse] = useState<string>('');
  
  const handleCommandProcessed = async (command: string) => {
    setLastCommand(command);
    setIsProcessing(true);
    
    try {
      const result = await AICommandProcessor.processCommand(command);
      setResponse(result);
      addToHistory(command);
      
      // Speak the response (optional text-to-speech)
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error processing AI command:', error);
      toast({
        title: "Assistant Error",
        description: "Sorry, I couldn't process that request.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Stop speech synthesis when drawer closes
  useEffect(() => {
    if (!isOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);
  
  // Accessibility enhancement: keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt+A to toggle AI Assistant
      if (e.altKey && e.key === 'a') {
        if (isChatOpen) {
          setIsChatOpen(false);
        } else {
          setIsOpen(prev => !prev);
        }
      }
      
      // Alt+C to toggle Chat Interface
      if (e.altKey && e.key === 'c') {
        setIsChatOpen(prev => !prev);
        if (isOpen) setIsOpen(false);
      }
      
      // Escape to close if open
      if (e.key === 'Escape') {
        if (isChatOpen) {
          setIsChatOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isChatOpen]);

  const handleButtonClick = () => {
    // Toggle between chat and voice modes
    if (isChatOpen) {
      setIsChatOpen(false);
    } else if (isOpen) {
      setIsOpen(false);
      setIsChatOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <ChatProvider>
        {/* Floating assistant button */}
        <AIAssistantButton onClick={handleButtonClick} isOpen={isOpen || isChatOpen} />
        
        {/* Chat Interface */}
        <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader>
              <DrawerTitle className="text-xl flex items-center justify-between">
                <span>AI Navigation Assistant</span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close">
                  <X className="size-4" />
                </Button>
              </DrawerTitle>
            </DrawerHeader>
            
            <div className="px-4 pb-4 space-y-4">
              <VoiceAssistant 
                isListening={isListening} 
                onListeningChange={setIsListening}
                onCommandProcessed={handleCommandProcessed}
              />
              
              {lastCommand && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">I heard:</p>
                    <p className="font-medium">{lastCommand}</p>
                  </CardContent>
                </Card>
              )}
              
              {response && (
                <Card className="bg-primary/10">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Response:</p>
                    <p className="font-medium">{response}</p>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex flex-col items-center">
                    <Button
                      className={`rounded-full size-16 flex items-center justify-center ${isListening ? 'bg-red-500 hover:bg-red-600' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setIsListening(!isListening)}
                      aria-label={isListening ? "Stop listening" : "Start listening"}
                      disabled={isProcessing}
                    >
                      <Mic className="size-6" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isListening ? "Listening..." : "Tap to speak"}
                    </p>
                  </div>
                </div>
              </div>
              
              <Card className="border-dashed">
                <CardContent className="pt-4">
                  <h4 className="text-sm font-semibold mb-2">Try saying:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>"Open public transport page"</li>
                    <li>"Switch to train tab"</li>
                    <li>"Go to settings"</li>
                    <li>"Search online for train schedules"</li>
                    <li>"Navigate to Brussels"</li>
                  </ul>
                </CardContent>
              </Card>
              
              {commandHistory.length > 0 && (
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-semibold mb-2">Recent commands:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {commandHistory.slice().reverse().slice(0, 5).map((cmd, i) => (
                        <li key={i} className="truncate">{cmd}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </ChatProvider>
    </ErrorBoundary>
  );
};

export default AIAssistant;
