import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { SignUpState } from 'types';
import { validateSignUp } from '../utils/signupValidation';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from './hooks';
import { signup } from '../redux/slices/authSlice';

const useSignUp = (
  navigation: any,
): SignUpState & { handleSignUp: () => Promise<void> } => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const methods = await auth().fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (err) {
      throw new Error('Failed to verify email availability');
    }
  };

  const handleRegister = async (): Promise<{
    name: string;
    email: string;
    password: string;
  }> => {
    setShowError(false);
    setEmailError(null);

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      termsAccepted,
    };

    const isValid = validateSignUp(trimmed, setShowError, setEmailError);
    if (!isValid) {
      throw new Error(emailError || 'Validation failed');
    }

    const emailExists = await checkEmailExists(trimmed.email);
    if (emailExists) {
      const message = 'This email is already registered. Please login instead.';
      setEmailError(message);
      Toast.show({
        type: 'error',
        text1: 'Email Error',
        text2: message,
      });
      throw new Error(message);
    }

    return trimmed;
  };

  const handleSignUp = async () => {
    if (!termsAccepted) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please accept the terms and conditions.',
      });
      return;
    }

    setLoading(true); 

    try {
      const userData = await handleRegister(); 
      await dispatch(signup(userData)).unwrap(); 
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully!',
      });
      navigation.navigate('App'); 
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'An error occurred during signup.',
      });
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
    setLoading,
    showError,
    handleRegister,
    emailError,
    termsAccepted,
    setTermsAccepted,
    handleSignUp,
  };
};

export default useSignUp;