
import React, { useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleVoiceInput: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  handleSend, 
  handleKeyDown,
  handleVoiceInput 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
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
  );
};

export default ChatInput;
