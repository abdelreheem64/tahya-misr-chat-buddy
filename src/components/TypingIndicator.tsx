import tahyaMisrLogo from '@/assets/tahya-misr-logo.png';

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 p-4 message-bot">
      <div className="flex-shrink-0">
        <img 
          src={tahyaMisrLogo}
          alt="المساعد الذكي"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
      <div className="bg-bot-message text-bot-message-foreground px-4 py-3 rounded-2xl rounded-tr-sm shadow-soft max-w-xs">
        <div className="flex items-center gap-1">
          <div className="typing-dot w-2 h-2 bg-muted-foreground rounded-full"></div>
          <div className="typing-dot w-2 h-2 bg-muted-foreground rounded-full"></div>
          <div className="typing-dot w-2 h-2 bg-muted-foreground rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;