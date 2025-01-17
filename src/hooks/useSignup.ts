import { useState } from 'react';

interface SignUpState {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  showError: boolean;
  emailError: string | null;
  handleRegister: () => Promise<{ name: string; email: string; password: string } | undefined>;
}

const useSignUp = (): SignUpState => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const handleRegister = async (): Promise<{ name: string; email: string; password: string } | undefined> => {
    if (!name || !email || !password) {
      setShowError(true);
      return undefined;
    }
  
    setLoading(true);
    setEmailError(null); // Clear any previous error
    try {
      // Example data validation, actual API will handle this
      return { name, email, password };
    } catch (error: any) {
      if (error.message.includes('already registered')) {
        setEmailError('This email is already registered.');
      }
      console.error("Signup error:", error);
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
    emailError
  };
};

export default useSignUp;
