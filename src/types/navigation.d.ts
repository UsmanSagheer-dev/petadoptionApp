import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Recover: undefined;
  App: any;
  PasswordUpdate: undefined;
  ProfileTab: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  App: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  PasswordUpdate: undefined;
  DonateScreen:any;
  Profiles: {
    userId?: string;
    name?: string;
  };
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavouriteTab: undefined;
  ProfileTab: undefined;
  PasswordUpdate: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type { BottomTabBarProps };