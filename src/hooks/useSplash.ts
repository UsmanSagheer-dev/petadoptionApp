// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { AuthState } from '../types/auth';

const useAuth = () => {
  const [showSplash, setShowSplash] = useState<AuthState['showSplash']>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return { showSplash };
};

export default useAuth;
