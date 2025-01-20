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

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;





