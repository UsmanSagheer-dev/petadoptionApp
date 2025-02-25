import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {SignUpState} from '../types/types';
import {validateEmail} from '../utils/emailUtils';

const useSignUp = (): SignUpState => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setShowError(true);
      setEmailError('All fields are required');
      return undefined;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError('Invalid email format');
      return undefined;
    }

    if (trimmedPassword.length < 6) {
      setShowError(true);
      setEmailError('Password must be at least 6 characters');
      return undefined;
    }

    if (!termsAccepted) {
      setEmailError('Please accept the terms and conditions');
      return undefined;
    }

    try {
      setLoading(true);
      const emailExists = await checkEmailExists(trimmedEmail);
      if (emailExists) {
        setEmailError(
          'This email is already registered. Please login instead.',
        );
        return undefined;
      }

      return {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      };
    } catch (error: any) {
      console.error('Signup validation error:', error);
      setShowError(true);
      setEmailError('An error occurred during registration');
      return undefined;
    } finally {
      setLoading(false);
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
};

export default useSignUp;
