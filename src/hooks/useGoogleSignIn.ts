import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleSignup } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store'; 
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'; 

const useGoogleSignIn = () => {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const onGoogleButtonPress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens(); 
      
      if (!idToken) {
        throw new Error('Google Sign-In failed: idToken is missing.');
      }
  
      await dispatch(googleSignup({ idToken })).unwrap(); 
    } catch (error) {
      // Type the error properly
      const errorMessage = error instanceof Error ? error.message : 'Google Sign-In failed. Please try again.';
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', errorMessage);
    }
  }, [dispatch]);

  return { onGoogleButtonPress, user, error };
};

export default useGoogleSignIn;