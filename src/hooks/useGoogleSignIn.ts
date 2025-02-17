import { useCallback } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useGoogleSignIn = () => {
  const onGoogleButtonPress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;
      if (!idToken) {
        throw new Error('Google Sign-In failed: idToken is missing.');
      }

      // ✅ Authenticate with Firebase
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const newUser = userCredential.user;

      if (!newUser || !newUser.uid) {
        throw new Error('Google Sign-In failed: No user data received.');
      }

      // ✅ Firestore me user ka data check karein
      const userDocRef = firestore().collection('users').doc(newUser.uid);
      const userSnapshot = await userDocRef.get();

      let userData;

      if (!userSnapshot.exists) {
        // ✅ Agar user nahi hai, toh Firestore me save karein
        userData = {
          uid: newUser.uid,
          displayName: newUser.displayName || 'Unknown User',
          email: newUser.email || '',
          photoURL: newUser.photoURL || null,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        await userDocRef.set(userData);
      } else {
        // ✅ Agar user mojood hai, toh uska data fetch karein
        userData = userSnapshot.data();
      }

      console.log('User Data:', userData);
      return userData;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    }
  }, []);

  return { onGoogleButtonPress };
};

export default useGoogleSignIn;
