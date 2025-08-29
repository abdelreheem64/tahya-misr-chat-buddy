import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center p-8 max-w-md mx-4">
        <div className="mb-6">
          <AlertCircle className="h-16 w-16 text-tahya-red mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-tahya-red mb-2">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            الصفحة غير موجودة
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير متوفرة.
            <br />
            قد تكون محذوفة أو تم نقلها إلى مكان آخر.
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="btn-tahya gap-2"
          size="lg"
        >
          <Home className="h-4 w-4" />
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
