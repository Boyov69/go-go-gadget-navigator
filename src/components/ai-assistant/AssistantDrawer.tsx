
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, X, MessageSquare } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import VoiceAssistant from './VoiceAssistant';
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from '@/components/ui/drawer';

interface AssistantDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  lastCommand: string;
  response: string;
  isProcessing: boolean;
  commandHistory: string[];
  onListeningChange: (isListening: boolean) => void;
  isListening: boolean;
  onCommandProcessed: (command: string) => void;
}

const AssistantDrawer: React.FC<AssistantDrawerProps> = ({
  isOpen,
  setIsOpen,
  lastCommand,
  response,
  isProcessing,
  commandHistory,
  onListeningChange,
  isListening,
  onCommandProcessed
}) => {
  const { preferredMode } = useAI();
  
  const handleSwitchToChat = () => {
    setIsOpen(false);
    // The chat interface will be opened in the AIAssistant component
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'c',
        altKey: true
      }));
    }, 300);
  };

  return (
    <DrawerContent className="h-[80vh]">
      <DrawerHeader>
        <DrawerTitle className="text-xl flex items-center justify-between">
          <span>AI Navigation Assistant</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSwitchToChat} 
              className="flex items-center gap-1"
            >
              <MessageSquare className="size-4" />
              <span>Chat Mode</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close">
              <X className="size-4" />
            </Button>
          </div>
        </DrawerTitle>
      </DrawerHeader>
      
      <div className="px-4 pb-4 space-y-4 overflow-y-auto">
        <VoiceAssistant 
          isListening={isListening} 
          onListeningChange={onListeningChange}
          onCommandProcessed={onCommandProcessed}
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
                onClick={() => onListeningChange(!isListening)}
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
      
      <DrawerFooter className="border-t pt-2">
        <div className="flex justify-center w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSwitchToChat}
            className="flex items-center gap-1 w-full sm:w-auto"
          >
            <MessageSquare className="size-4" />
            <span>Switch to Chat Interface</span>
          </Button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AssistantDrawer;
