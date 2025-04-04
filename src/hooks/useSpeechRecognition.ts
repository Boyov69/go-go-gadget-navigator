
import { useRef, useCallback } from 'react';

interface SpeechRecognitionOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

export const useSpeechRecognition = ({
  onResult,
  onError,
  onEnd,
  continuous = false,
  interimResults = false,
  lang = 'en-US'
}: SpeechRecognitionOptions = {}) => {
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition
  const initRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                            (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      onError?.('Speech recognition is not supported in this browser.');
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };
    
    recognition.onerror = (event: any) => {
      if (onError) onError(event.error);
    };
    
    recognition.onend = () => {
      if (onEnd) onEnd();
    };
    
    return recognition;
  }, [continuous, interimResults, lang, onResult, onError, onEnd]);
  
  // Start recognition
  const start = useCallback(() => {
    try {
      if (!recognitionRef.current) {
        recognitionRef.current = initRecognition();
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to start recognition', e);
      return false;
    }
  }, [initRecognition]);
  
  // Stop recognition
  const stop = useCallback(() => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to stop recognition', e);
      return false;
    }
  }, []);
  
  return {
    start,
    stop,
    isSupported: typeof window !== 'undefined' && 
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) !== undefined
  };
};
