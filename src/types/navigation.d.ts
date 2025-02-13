import { 
  NativeStackNavigationProp,
  NativeStackScreenProps 
} from '@react-navigation/native-stack';
import { 
  BottomTabBarProps,
  BottomTabNavigationProp 
} from '@react-navigation/bottom-tabs';
import { 
  DrawerNavigationProp,
  DrawerScreenProps 
} from '@react-navigation/drawer';

// Consolidated root stack type
export type RootStackParamList = {
  AdoptNow:undefined,
  DonateScreen:undefined,
  Auth: undefined;
  App: undefined;
  Splash: undefined;
  
};

// Auth stack type
export type AuthStackParamList = {
  App:undefined;
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  PasswordUpdate: undefined;
};

// Main app stack type
export type AppStackParamList = {
  Detail: { id: string; name: string; pet: any };
  DetailScreen: { id: string; name: string; pet: any };
  ProfileScreen:undefined,
  PasswordUpdate:undefined,
  AdoptNow:undefined,
  DonateScreen:undefined;
  MyDonationScreen: undefined;
  Main: undefined;
  Drawer: undefined;
  PasswordUpdate: undefined;

  Donate: { donationType?: string };
  MyDonations: { filter?: 'active' | 'completed' };
};

// Drawer navigation type
export type DrawerParamList = {
  PasswordUpdate:undefined;
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  MainStack: undefined;
  Donate: { donationType?: string;

};
MyDonation: { donationType?: string};
}

// Tab navigation type
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// Consolidated navigation props
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type DrawerNavigationProp = DrawerNavigationProp<DrawerParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

// Screen props types
export type PasswordUpdateScreenProps = NativeStackScreenProps<AuthStackParamList, 'PasswordUpdate'>;
export type DetailScreenProps = NativeStackScreenProps<AppStackParamList, 'Detail'>;
export type DonateScreenProps = NativeStackScreenProps<AppStackParamList, 'Donate'>;
export type MyDonationsScreenProps = NativeStackScreenProps<AppStackParamList, 'MyDonations'>;

// Bottom tab bar props (keep if you need direct access)
export type { BottomTabBarProps };