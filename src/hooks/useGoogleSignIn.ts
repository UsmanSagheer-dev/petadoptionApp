import { useCallback } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import useGoogleSignInConfig from './useGoogleSignInConfig';

const useGoogleSignIn = () => {
  const onGoogleButtonPress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;
      if (!idToken) {
        throw new Error('Google Sign-In failed: idToken is missing.');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    }
  }, []);

  return { onGoogleButtonPress };
};

export default useGoogleSignIn;
