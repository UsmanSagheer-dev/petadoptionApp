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
  handleRegister: () => Promise<{ name: string; email: string; password: string } | undefined>;
}

const useSignUp = (): SignUpState => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleRegister = async (): Promise<{ name: string; email: string; password: string } | undefined> => {
    if (!name || !email || !password) {
      setShowError(true);
      return undefined;
    }

    setLoading(true);
    try {
      // یوزر ڈیٹا ریٹرن کر رہا ہے
      return { name, email, password };
    } catch (error) {
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
  };
};

export default useSignUp;
