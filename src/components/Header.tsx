import { useState, useEffect } from 'react';
import tahyaMisrLogo from '@/assets/tahya-misr-logo.png';

const Header = () => {
  return (
    <header 
      className="sticky top-0 z-50 w-full bg-gradient-tahya shadow-soft"
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
              <h1 className="text-xl font-bold text-white">
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