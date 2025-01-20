// src/types/state.d.ts
export interface PasswordUpdateState {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    isLoading: boolean;
  }
  
  export interface SignUpState {
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
  