import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export type { BottomTabBarProps };

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  App: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  PasswordUpdate:undefined;
  Profiles: {
    userId?: string;
    name?: string;
  };
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavouriteTab: undefined;
  ProfileTab: undefined; // Ensure this exists
  PasswordUpdate: undefined;
};
