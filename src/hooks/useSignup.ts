import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {SignUpState} from '../types/types';

const useSignUp = (): SignUpState => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const validateEmail = (emailToValidate: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const methods = await auth().fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleRegister = async (): Promise<
    {name: string; email: string; password: string} | undefined
  > => {
    setShowError(false);
    setEmailError(null);

    if (!name || !email || !password) {
      setShowError(true);
      return undefined;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return undefined;
    }

    if (password.length < 6) {
      setShowError(true);
      setEmailError('Password must be at least 6 characters');
      return undefined;
    }

    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setEmailError('This email is already registered. Please login instead.');
        return undefined;
      }

      return {name, email, password};
    } catch (error: any) {
      console.error('Signup validation error:', error);
      setShowError(true);
      return undefined;
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    showError,
    handleRegister,
    emailError,
    termsAccepted,
    setTermsAccepted,
    setLoading,
  };
}

export default useSignUp;