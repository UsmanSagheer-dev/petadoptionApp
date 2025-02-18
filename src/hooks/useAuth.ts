import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setUser, setInitializing, setShowSplash} from '../redux/slices/authSlice';
import type {RootState} from '../redux/store';

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

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