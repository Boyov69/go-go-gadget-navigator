
import React, { useState } from 'react';
import VoiceAssistant from './VoiceAssistant';
import { AICommandProcessor } from '@/services/ai/AICommandProcessor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { RocketIcon, Mic, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AIAssistant: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [latestCommand, setLatestCommand] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  
  const handleCommandProcessed = async (command: string) => {
    setLatestCommand(command);
    
    try {
      const result = await AICommandProcessor.processCommand(command);
      setResponse(result);
    } catch (error) {
      console.error('Error processing AI command:', error);
      toast({
        title: "Assistant Error",
        description: "Sorry, I couldn't process that request.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {/* Floating assistant trigger button */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="fixed bottom-24 right-6 rounded-full shadow-lg size-14 z-50"
            variant="default"
          >
            <RocketIcon className="size-6" />
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle className="text-xl flex items-center justify-between">
              <span>AI Navigation Assistant</span>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
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
            
            {latestCommand && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">I heard:</p>
                  <p className="font-medium">{latestCommand}</p>
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
            
            <div className="flex flex-col items-center mt-6">
              <Button
                className={`rounded-full size-16 flex items-center justify-center ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                onClick={() => setIsListening(!isListening)}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                <Mic className="size-6" />
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                {isListening ? "Listening..." : "Tap to speak"}
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AIAssistant;
