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
  PasswordUpdate: undefined;
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
  Detail: { 
    id: string;  
    name: string;  
    pet: any; // Pet must always be provided
  };
  DetailScreen: { id: string; name: string; pet: any };
  ProfileScreen: {}; // Empty object instead of `undefined`
  PasswordUpdate: {};
  AdoptNow: {};
  DonateScreen: {};
  MyDonationScreen: {};
  Main: {};
  Drawer: {};
  Donate: { donationType: string };
  MyDonations: { filter: 'active' | 'completed' };  
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
export type PasswordUpdateNavigationProp = StackNavigationProp<RootStackParamList, 'PasswordUpdate'>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type DrawerNavigationProp = DrawerNavigationProp<DrawerParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
// Screen props types
export type PasswordUpdateScreenProps = NativeStackScreenProps<AuthStackParamList, 'PasswordUpdate'>;
export type DetailScreenProps = NativeStackScreenProps<AppStackParamList, 'Detail'>;
export type DonateScreenProps = NativeStackScreenProps<AppStackParamList, 'Donate'>;
export type MyDonationsScreenProps = NativeStackScreenProps<AppStackParamList, 'MyDonations'>;

// Bottom tab bar props (keep if you need direct access)
export type { BottomTabBarProps };