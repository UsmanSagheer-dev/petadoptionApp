import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { LoginScreenNavigationProp } from 'types';
import Toast from 'react-native-toast-message';

const useLogin = (navigation: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setTermsError('');

    if (!email || !password) {
      setError('All fields are required');
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'All fields are required',
      });
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setTermsError('You must accept the terms and conditions to proceed.');
      Toast.show({
        type: 'error',
        text1: 'Terms Error',
        text2: 'You must accept the terms and conditions to proceed.',
      });
      setLoading(false);
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful!',
      });
      navigation.navigate('App');
    } catch (err: any) {
      const errorMessage = err?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    termsAccepted,
    setTermsAccepted,
    termsError,
  };
};

export default useLogin;