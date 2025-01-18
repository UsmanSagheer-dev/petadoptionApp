export interface UseSignUp {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    handleRegister: () => Promise<{ name: string; email: string; password: string } | undefined>;
    showError: boolean;
  }






  