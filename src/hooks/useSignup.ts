import {useState} from 'react';
import {SignUpState} from './types';
const useSignUp = (): SignUpState => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const handleRegister = async (): Promise<
    {name: string; email: string; password: string} | undefined
  > => {
    if (!name || !email || !password) {
      setShowError(true);
      return undefined;
    }

    setLoading(true);
    setEmailError(null);
    try {
      return {name, email, password};
    } catch (error: any) {
      if (error?.message.includes('already registered')) {
        setEmailError('This email is already registered.');
      }
      console.error('Signup error:', error);
      setShowError(true);
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
  };
};

export default useSignUp;
