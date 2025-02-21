import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp as DrawerNavProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReactNode} from 'react';
import {
  ViewStyle,
  TextStyle,
  DimensionValue,
  ImageSourcePropType,
} from 'react-native';

// User and Auth Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  imageUrl?: string | null;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  showSplash: boolean;
  user: {
    uid: string;
    email: string;
  } | null;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface AdoptionRequest {
  id?: string;
  userId: string;
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: FirebaseFirestoreTypes.Timestamp;
  message?: string;
  userDetails?: {
    name: string;
    email: string;
    phone?: string;
    userId: string;
    userName: string;
    userEmail: string;
    timestamp: string;
  };
}

export interface PetDonation {
  id: string;
  userId: string;
  petType: string;
  gender: string;
  vaccinated: string;
  petBreed: string;
  requests: AdoptionRequest[];
  petName: string;
  age:number;
  description: string;
  contactNumber: string;
  imageUrl: string[];
  amount?: number;
  userName: string;
  location: string;

  createdAt: {
    toDate: () => Date;
  };
}

export type Pet = {
  id: string;
  userId?: string;
  petBreed: string;
  petWeight?: number;
  location: string;
  gender: string;
  isFavorite?: boolean;
  imageUrl: string;
  age: string;
  weight?: string;
  vaccinated: boolean;
  type: string;
  description: string;
  petType: string;
  donation: string;
  amount?: number;
};

// UI Component Props
export interface LoginButtonProps {
  onClick: () => void;
  title: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  disabled?: boolean;
}

export interface LoginButtonStyles {
  button: ViewStyle;
  buttonText: TextStyle;
}

export interface CustomeHeaderProps {
  title: string;
  DonateScreen?: boolean;
}

export interface PetCardProps {
  imageUrl: string | string[];
  name: string;
  age: any; // Changed from any to string
  location: string;
  gender: string;
  icon: React.ReactNode;
  onPress: () => void;
  onIconPress: () => void;
  locationIcon: React.ReactNode;
}

export interface TabItem {
  id: string;
  label: string;
}

export interface PickerInputProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: {label: string; value: string}[];
}

export interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface CardProps {
  title: string;
  subtitle: string;
  date: string;
  money: string;
  imageUrl?: string;
}

export interface CustomTextProps {
  title: string;
  style?: TextStyle;
}

export interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPet?: Pet | null;
}

export type RootStackParamList = {
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
  setLoading: any;
  Main: undefined;
};

export type AuthStackParamList = {
  App: undefined;
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  PasswordUpdate: undefined;
};

export type AppStackParamList = {
  Detail: {
    id: string;
    name: string;
    pet: Pet;
  };
  DetailScreen: {
    id: string;
    name: string;
    pet: Pet;
  };
  ProfileScreen: {userId?: string};
  PasswordUpdate: undefined;
  AdoptNow: undefined;
  DonateScreen: undefined;
  MyDonationScreen: undefined;
  Main: undefined;
  Drawer: undefined;
  Donate: {donationType: string};
  MyDonations: {filter: 'active' | 'completed'};
};

export type DrawerParamList = {
  AdoptNow: undefined;
  PasswordUpdate: undefined;
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  MainStack: undefined;
  Donate: {donationType?: string};
  MyDonation: {donationType?: string};
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type PasswordUpdateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PasswordUpdate'
>;
export type NavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  'PasswordUpdate',
  'Donatescreen'
>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
export  interface Props {
  navigation: SignUpScreenNavigationProp;
}
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;
export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
export type DrawerNavigationProp = DrawerNavProp<DrawerParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;
export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export type PasswordUpdateScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'PasswordUpdate'
>;
export type DetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Detail'
>;
export type DonateScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Donate'
>;
export type MyDonationsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'MyDonations'
>;

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordUpdateState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  isLoading: boolean;
}

export interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
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
  handleRegister: () => Promise<
    {name: string; email: string; password: string} | undefined
  >;
  termsAccepted: boolean;
  setTermsAccepted: (termsAccepted: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export type {BottomTabBarProps};

export type NavigationProp = {
  replace: (screen: string) => void;
};

export interface ImgWithTextProps {
  imageSource: ImageSourcePropType;
  label: string;
}

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  onTabPress: (tabId: string) => void;
}
