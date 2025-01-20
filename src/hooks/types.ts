import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Recover: undefined;
  App: any;
  PasswordUpdate: undefined;
  ProfileTab: undefined;
};
export interface PasswordUpdateState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  isLoading: boolean;
}

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;



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
  