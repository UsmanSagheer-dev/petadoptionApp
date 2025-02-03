import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginScreenNavigationProp} from '../types/navigation';
const useLogin = (navigation: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState('');
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    if (!termsAccepted) {
      setTermsError('You must accept the terms and conditions to proceed.');
      setLoading(false);
      return;
    }
    setTermsError('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('App');
    } catch (err: any) {
      console.error('Login failed:', err.message);
      setError(err?.message || 'Login failed. Please try again.');
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
