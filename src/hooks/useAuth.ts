import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUser, setInitializing, setShowSplash } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      dispatch(setUser(user));
      if (authState.initializing) {
        dispatch(setInitializing(false));
      }
    });

    const splashTimeout = setTimeout(() => {
      dispatch(setShowSplash(false));
    }, 3000);

    return () => {
      subscriber();
      clearTimeout(splashTimeout);
    };
  }, [dispatch, authState.initializing]);

  return authState;
};

export default useAuth;
