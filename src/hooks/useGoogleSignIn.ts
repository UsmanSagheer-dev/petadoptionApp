import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {googleSignup} from '../redux/slices/authSlice';

const useGoogleSignIn = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const error = useAppSelector(state => state.auth.error);
  const onGoogleButtonPress = useCallback(async () => {
    try {
      setIsGoogleLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error('Google Sign-In failed: idToken is missing.');
      }

      await dispatch(googleSignup({idToken})).unwrap();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Google Sign-In failed. Please try again.';
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  }, [dispatch]);

  return {onGoogleButtonPress, user, error, isGoogleLoading};
};

export default useGoogleSignIn;
