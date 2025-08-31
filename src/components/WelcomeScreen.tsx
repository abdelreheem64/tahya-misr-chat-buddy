import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onSuggestedQuestion: (question: string) => void;
  onFillInput: (question: string) => void;
}

const WelcomeScreen = ({ onSuggestedQuestion, onFillInput }: WelcomeScreenProps) => {
  const suggestions = [
    "رؤية الاتحاد ورسالته وأهدافه",
    "المشاريع والمبادرات الكبيرة", 
    "الهيكل الإداري التنظيمي المركزي",
    "وصف تفصيلي لأي لجنة مركزية",
    "الفئات التي يستهدفها في شغلها",
    "مجلس المنسقين"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
      {/* Main Icon */}
      <div className="mb-8">
        <div className="h-20 w-20 bg-tahya-red rounded-2xl flex items-center justify-center shadow-elegant">
          <MessageSquare className="h-12 w-12 text-white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-12 max-w-lg">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          أهلاً وسهلاً بحضرتك
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          موقعي أساعدك في أي سؤال متعلق بالكيان الشبابي
        </p>
      </div>

      {/* Quick Suggestions */}
      <div className="w-full max-w-4xl">
        <h3 className="text-right text-lg font-semibold text-foreground mb-6 px-2">
          اقتراحات سريعة:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onFillInput(suggestion)}
              className="
                h-auto p-4 text-right justify-start
                bg-card hover:bg-accent/50 border-border
                text-foreground hover:text-accent-foreground
                transition-all duration-200 shadow-soft hover:shadow-elegant
                rounded-xl
              "
            >
              <div className="flex items-center gap-3 w-full">
                <div className="h-2 w-2 bg-tahya-red rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium leading-relaxed">
                  {suggestion}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;