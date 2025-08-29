import { User, Bot } from 'lucide-react';
import tahyaMisrLogo from '@/assets/tahya-misr-logo.png';

interface MessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const Message = ({ message, isUser, timestamp }: MessageProps) => {
  const formatMessage = (text: string) => {
    // Split long messages into paragraphs for better readability
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a header (starts with **text**)
      if (paragraph.includes('**')) {
        const parts = paragraph.split('**');
        return (
          <p key={index} className="mb-3">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-bold text-tahya-red">{part}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      
      // Check if it's a list item (starts with - or •)
      if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
        return (
          <div key={index} className="mb-2 flex items-start gap-2">
            <span className="text-tahya-gold mt-1 flex-shrink-0">•</span>
            <span className="flex-1">{paragraph.replace(/^[-•]\s*/, '')}</span>
          </div>
        );
      }
      
      // Check for links (basic URL detection)
      if (paragraph.includes('http')) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = paragraph.split(urlRegex);
        return (
          <p key={index} className="mb-3 last:mb-0">
            {parts.map((part, partIndex) => 
              urlRegex.test(part) ? (
                <a 
                  key={partIndex} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tahya-red hover:text-tahya-red/80 underline"
                >
                  {part}
                </a>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-3 last:mb-0 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className={`
      flex items-start gap-3 p-4
      ${isUser ? 'flex-row-reverse message-user' : 'message-bot'}
    `}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="h-8 w-8 bg-user-message rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-user-message-foreground" />
          </div>
        ) : (
          <img 
            src={tahyaMisrLogo}
            alt="المساعد الذكي"
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
      </div>

      <div className={`
        max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-soft
        ${isUser 
          ? 'bg-user-message text-user-message-foreground rounded-tl-sm' 
          : 'bg-bot-message text-bot-message-foreground rounded-tr-sm'
        }
      `}>
        <div className="text-sm leading-relaxed">
          {formatMessage(message)}
        </div>
        
        <div className={`
          text-xs mt-2 opacity-70
          ${isUser ? 'text-left' : 'text-right'}
        `}>
          {timestamp.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;