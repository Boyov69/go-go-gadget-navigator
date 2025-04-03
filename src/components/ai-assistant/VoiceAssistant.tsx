
import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoiceAssistantProps {
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
  onCommandProcessed: (command: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  isListening, 
  onListeningChange,
  onCommandProcessed 
}) => {
  const recognitionRef = useRef<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || 
                            (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onCommandProcessed(transcript);
        // Auto-stop listening after a command is recognized
        onListeningChange(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setError(`Speech recognition error: ${event.error}`);
        onListeningChange(false);
      };
      
      recognitionRef.current.onend = () => {
        onListeningChange(false);
      };
    }
  }, [onCommandProcessed, onListeningChange]);
  
  // Start or stop the speech recognition based on isListening prop
  useEffect(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      try {
        recognitionRef.current.start();
        setError(null);
      } catch (e) {
        console.error('Failed to start recognition', e);
        setError('Failed to start speech recognition. Please try again.');
        onListeningChange(false);
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors when stopping (might not be active)
      }
    }
    
    return () => {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
      }
    };
  }, [isListening, onListeningChange]);
  
  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default VoiceAssistant;
