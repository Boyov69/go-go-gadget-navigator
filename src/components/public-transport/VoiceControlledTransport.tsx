
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, VolumeX } from 'lucide-react';

interface VoiceControlledTransportProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const VoiceControlledTransport: React.FC<VoiceControlledTransportProps> = ({
  onTabChange,
  activeTab
}) => {
  const { toast } = useToast();
  
  const handleVoiceToggle = () => {
    toast({
      title: "Voice Assistant Available",
      description: "Say 'Open train tab' or 'Show nearby stations' to navigate",
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Voice Navigation Available</CardTitle>
        <CardDescription>
          Use the AI Assistant to navigate public transport information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">Try saying:</p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>"Open train tab"</li>
          <li>"Show nearby stations"</li>
          <li>"Switch to bus tab"</li>
          <li>"Search for Brussels train station"</li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleVoiceToggle}
          className="text-xs"
        >
          <Mic className="h-3 w-3 mr-1" />
          Enable Voice
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }}
          className="text-xs"
        >
          <VolumeX className="h-3 w-3 mr-1" />
          Stop Speech
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceControlledTransport;
