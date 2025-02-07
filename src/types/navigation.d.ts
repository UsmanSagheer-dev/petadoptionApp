import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
export type DrawerNavigationProp={
  current: 'HomeTab' | 'SearchTab' | 'FavouriteTab' | 'ProfileTab',
  index: number,
}
export type RootStackParamList = {
  Login: {}; // ✅ Empty object instead of undefined
  Home: {};
  SignUp: {};
  Recover: {};
  App: RootStackParamList; // ✅ Strongly typed reference
  ProfileTab: {};
  DonateScreen: {};
  MyDonationScreen: {};
  Detail: { pet: string }; // ✅ Strongly typed pet parameter
};

export type AuthStackParamList = {
  PasswordUpdate:{},
  Login: {};
  SignUp: {};
  Recover: {};
  App: {};
};

export type AppStackParamList = {
  HomeStack:{},
  Drawer: {};
  Main: {};
  PasswordUpdate: {}; // ✅ No more undefined
  DonateScreen: {};
  MyDonationScreen: {};
  Detail: { id: string; name: string }; // ✅ Strongly typed detail params
  Profiles: {
    userId: string;
    name: string;
  };
};

export type TabParamList = {
  HomeTab: {};
  SearchTab: {};
  FavouriteTab: {};
  ProfileTab: {};
};

// ✅ Specific type for PasswordUpdate navigation
export type PasswordUpdateNavigationProp = NativeStackNavigationProp<AppStackParamList, 'PasswordUpdate'>;

export type { BottomTabBarProps };
