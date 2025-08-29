import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from './ui/button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput = ({ onSendMessage, disabled = false, placeholder = "اسأل عن أي شئ." }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="bg-background border-t border-border p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className="
                w-full min-h-[44px] max-h-[120px] p-3 pr-4 pl-12
                bg-input border border-border rounded-2xl
                text-foreground placeholder:text-muted-foreground
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                resize-none text-right
                transition-all duration-200
              "
              rows={1}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute left-2 bottom-2 h-8 w-8 p-0 hover:bg-muted"
              disabled
            >
              <Mic className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="
              h-11 px-4 btn-tahya
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2
            "
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">إرسال</span>
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default MessageInput;