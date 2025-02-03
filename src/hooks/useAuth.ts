import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
const useAuth = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        if (initializing) setInitializing(false);
      },
    );
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => {
      clearTimeout(splashTimeout);
      subscriber();
    };
  }, [initializing]);
  return {initializing, user, showSplash};
};

export default useAuth;
