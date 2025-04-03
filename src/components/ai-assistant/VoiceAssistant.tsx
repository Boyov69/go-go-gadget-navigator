
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Mic, Volume2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

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
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  
  // Audio visualization
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let dataArray: Uint8Array | null = null;
    let animationFrame: number | null = null;
    
    const setupAudioVisualization = async () => {
      if (!isListening) return;
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        const updateVolume = () => {
          if (!isListening || !analyser || !dataArray) return;
          
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
          const normalizedVolume = Math.min(100, average * 2); // Scale for better visual
          setVolume(normalizedVolume);
          
          animationFrame = requestAnimationFrame(updateVolume);
        };
        
        updateVolume();
      } catch (err) {
        console.error("Error setting up audio visualization:", err);
      }
    };
    
    if (isListening) {
      setupAudioVisualization();
    }
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (microphone) microphone.disconnect();
      if (audioContext) audioContext.close();
    };
  }, [isListening]);
  
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
      
      {isListening && (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-8 h-8">
            <Volume2 className={`h-6 w-6 animate-pulse text-primary`} />
          </div>
          <Progress value={volume} className="w-full h-2" />
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
