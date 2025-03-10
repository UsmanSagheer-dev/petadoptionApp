import {useCallback, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {googleSignup} from '../redux/slices/authSlice';
import Toast from 'react-native-toast-message';

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
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Google Sign-In successful!',
      });

    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Google Sign-In failed. Please try again.';

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }, [dispatch]);

  return {onGoogleButtonPress, user, error, isGoogleLoading};
};

export default useGoogleSignIn;
