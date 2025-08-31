import { useState, useRef, KeyboardEvent, forwardRef, useImperativeHandle } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from './ui/button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onInputFocus?: () => void;
  onInputChange?: () => void;
}

export interface MessageInputRef {
  fillInput: (text: string) => void;
}

const MessageInput = forwardRef<MessageInputRef, MessageInputProps>(({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "اسأل عن أي شئ...",
  onInputFocus,
  onInputChange: onInputChangeCallback
}, ref) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    fillInput: (text: string) => {
      setMessage(text);
      // Focus on the textarea after filling
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Auto-resize textarea
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
      }, 100);
    }
  }), []);

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
    
    // Call the callback when user starts typing
    if (onInputChangeCallback) {
      onInputChangeCallback();
    }
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleFocus = () => {
    if (onInputFocus) {
      onInputFocus();
    }
    
    // تمرير إضافي لضمان ظهور خانة الإدخال بالكامل
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);
  };

  return (
    <div className="p-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onFocus={handleFocus}
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
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;