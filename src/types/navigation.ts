import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp as DrawerNavProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {Pet} from './pet';

export interface RootStackParamList {
  Home: undefined;
  Details: undefined;
  AdoptNow: undefined;
  DonateScreen: undefined;
  Auth: undefined;
  App: undefined;
  Splash: undefined;
  PasswordUpdate: undefined;
  Login: undefined;
  RecoverPassword: undefined;
  Search: undefined;
  Detail: {pet: Pet};
  SignUp: undefined;
  setLoading: (loading: boolean) => void;
  Main: undefined;
  [key: string]: any;
}

export interface AuthStackParamList {
  App: undefined;
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  PasswordUpdate: undefined;
  [key: string]: any;
}

export interface AppStackParamList {
  Detail: {id: string; name: string; pet: Pet};
  DetailScreen: {id: string; name: string; pet: Pet};
  ProfileScreen: {userId?: string};
  PasswordUpdate: undefined;
  AdoptNow: undefined;
  DonateScreen: undefined;
  MyDonationScreen: undefined;
  Main: undefined;
  Drawer: undefined;
  Donate: {donationType: string};
  MyDonations: {filter: 'active' | 'completed'};
  SearchScreen: undefined;
  [key: string]: any;
}

export interface DrawerParamList {
  AdoptNow: undefined;
  PasswordUpdate: undefined;
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  MainStack: undefined;
  Donate: {donationType?: string};
  MyDonation: {donationType?: string};
  [key: string]: any;
}

export interface TabParamList {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
  HomeTab: undefined;
  SearchTab: undefined;
  FavouriteTab: undefined;
  ProfileTab: undefined;
  [key: string]: any;
}

 export interface ScreenConfig {
    name: keyof AppStackParamList;
    component: React.ComponentType<any>;
  }
export interface TabConfig {
    name: keyof TabParamList;
    component: React.ComponentType<any>;
    label: string;
    icon: string;
  }
    export interface NavigationProp {
    replace: (screen: string) => void;
  }

export interface PasswordUpdateNavigationProp extends NativeStackNavigationProp<RootStackParamList, 'PasswordUpdate'> {}
export interface NavigationProps extends NativeStackNavigationProp<AppStackParamList, 'PasswordUpdate' | 'DonateScreen'> {}
export interface SignUpScreenNavigationProp extends NativeStackNavigationProp<RootStackParamList, 'SignUp'> {}
export interface RootStackNavigationProp extends NativeStackNavigationProp<RootStackParamList> {}
export interface AuthStackNavigationProp extends NativeStackNavigationProp<AuthStackParamList> {}
export interface AppStackNavigationProp extends NativeStackNavigationProp<AppStackParamList> {}
export interface DrawerNavigationProp extends DrawerNavProp<DrawerParamList> {}
export interface TabNavigationProp extends BottomTabNavigationProp<TabParamList> {}
export interface LoginScreenNavigationProp extends StackNavigationProp<AuthStackParamList, 'Login'> {}
export interface RecoverPasswordScreenNavigationProp extends NativeStackNavigationProp<RootStackParamList, 'RecoverPassword'> {}
export interface SearchScreenNavigationProp extends StackNavigationProp<RootStackParamList, 'Search'> {}
export interface HomeScreenNavigationProp extends StackNavigationProp<RootStackParamList, 'Home'> {}

export interface PasswordUpdateScreenProps extends NativeStackScreenProps<AuthStackParamList, 'PasswordUpdate'> {}
export interface DetailScreenProps extends NativeStackScreenProps<AppStackParamList, 'Detail'> {}
export interface DonateScreenProps extends NativeStackScreenProps<AppStackParamList, 'Donate'> {}
export interface MyDonationsScreenProps extends NativeStackScreenProps<AppStackParamList, 'MyDonations'> {}
export interface LoginScreenProps { navigation: LoginScreenNavigationProp; }
export interface HomeScreenProps { navigation: HomeScreenNavigationProp; }
export interface RecoverProps { navigation: RecoverPasswordScreenNavigationProp; }
export interface Props { navigation: SignUpScreenNavigationProp; }
