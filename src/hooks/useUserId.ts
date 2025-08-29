import { useState, useEffect } from 'react';

const USER_ID_KEY = 'tahya-misr-user-id';

export const useUserId = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Try to get existing user ID from localStorage
    let existingUserId = localStorage.getItem(USER_ID_KEY);
    
    if (!existingUserId) {
      // Generate new user ID
      existingUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem(USER_ID_KEY, existingUserId);
    }
    
    setUserId(existingUserId);
  }, []);

  return userId;
};