import { useState, useEffect } from 'react';
import tahyaMisrLogo from '@/assets/tahya-misr-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-soft' 
          : 'bg-gradient-tahya'
        }
      `}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={tahyaMisrLogo}
              alt="شعار اتحاد طلاب تحيا مصر"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className={`
                text-xl font-bold transition-colors duration-300
                ${isScrolled ? 'text-tahya-red' : 'text-white'}
              `}>
                اتحاد طلاب تحيا مصر
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;