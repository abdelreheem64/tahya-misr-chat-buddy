import { useState, useEffect, useRef } from 'react';
import { useUserId } from '@/hooks/useUserId';
import { useAudio } from '@/hooks/useAudio';
import { sendMessage } from '@/services/chatApi';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = useUserId();
  const { playMessageSent } = useAudio();
  const { toast } = useToast();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    if (!userId) return;

    // Hide welcome screen after first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Play send sound
    playMessageSent();

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(messageText, userId);
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        message: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        message: error instanceof Error ? error.message : 'حدث خطأ غير متوقع. حاول مرة أخرى.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال رسالتك. حاول مرة أخرى.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gradient-subtle">
      {/* Welcome screen or Messages container */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl">
          {showWelcome ? (
            <WelcomeScreen onSuggestedQuestion={handleSuggestedQuestion} />
          ) : (
            <>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Message input */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading || !userId}
        placeholder="اسأل عن أي شئ..."
      />
      
      {/* Footer - always visible */}
      <div className="bg-background border-t border-border/50">
        <div className="container mx-auto max-w-4xl px-4 py-2">
          <p className="text-xs text-muted-foreground/60 text-center">
            لجنة التنظيم المركزية – اتحاد طلاب تحيا مصر
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;