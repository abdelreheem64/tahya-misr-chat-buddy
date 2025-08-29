import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface OneTimeNoticeProps {
  onClose: () => void;
}

const OneTimeNotice = ({ onClose }: OneTimeNoticeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 left-4 z-40 animate-slide-in-left">
      <div className="
        bg-white border border-tahya-red/20 rounded-2xl shadow-elegant
        p-4 mx-auto max-w-md
        transform transition-all duration-300
      ">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-bold text-tahya-red">تصميم وتنفيذ:</span>
              <br />
              لجنة التنظيم المركزية – اتحاد طلاب تحيا مصر
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="
              flex-shrink-0 h-6 w-6 rounded-full
              bg-muted hover:bg-muted/80
              flex items-center justify-center
              transition-colors duration-200
            "
            aria-label="إغلاق الإشعار"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneTimeNotice;