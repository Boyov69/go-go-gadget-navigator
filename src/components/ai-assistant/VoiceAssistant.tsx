
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Mic, Volume2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

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
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  
  const { start, stop, isSupported } = useSpeechRecognition({
    onResult: (transcript) => {
      if (transcript) {
        onCommandProcessed(transcript);
        // Auto-stop listening after a command is recognized
        onListeningChange(false);
      }
    },
    onError: (errorMsg) => {
      console.error('Speech recognition error', errorMsg);
      setError(`Speech recognition error: ${errorMsg}`);
      onListeningChange(false);
    },
    onEnd: () => {
      onListeningChange(false);
    }
  });
  
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
  
  // Start or stop the speech recognition based on isListening prop
  useEffect(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    
    if (isListening) {
      const started = start();
      if (!started) {
        setError('Failed to start speech recognition. Please try again.');
        onListeningChange(false);
      } else {
        setError(null);
      }
    } else {
      stop();
    }
  }, [isListening, start, stop, isSupported, onListeningChange]);
  
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
