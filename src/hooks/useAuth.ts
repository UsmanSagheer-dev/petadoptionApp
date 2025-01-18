import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const useAuth = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(true);  // Add the splash screen state

  useEffect(() => {
    // Authentication state change listener
    const subscriber = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    // Set a timeout for the splash screen to disappear after 3 seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);  // Hide splash screen after 3 seconds
    }, 3000);

    // Cleanup the timeout and subscriber when the component unmounts
    return () => {
      clearTimeout(splashTimeout);
      subscriber();  // Unsubscribe from the authentication listener
    };
  }, [initializing]);

  return { initializing, user, showSplash };  // Return both auth state and splash state
};

export default useAuth;
