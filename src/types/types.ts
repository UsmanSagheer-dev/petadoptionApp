import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp as DrawerNavProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReactNode } from 'react';
import {
  ViewStyle,
  TextStyle,
  DimensionValue,
  ImageSourcePropType,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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
  initializing: boolean;
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

export interface Pet extends PetDonationCreate {
  id: string;
  userId: string;
  requests: AdoptionRequestBasic[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  ownerDisplayName?: string;
  ownerEmail?: string;
  ownerPhotoURL?: string;
  isFavorite?: boolean;
  minWeight: number;
}

export interface AdoptionRequest {
  id?: string;
  userId: string;
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: FirebaseFirestoreTypes.Timestamp;
  message?: string;
  userName?: string;
    userEmail: string;
    timestamp: string;
  userDetails?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    userId: string;
    userName?: string;
    userEmail: string;
    timestamp: string;
  };
}
export interface AdoptionRequestBasic {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected'; // Union type, kept as is
  timestamp?: string;
  userName?: string;
  userEmail?: string;
}

export interface PetDonationCreate {
  petType: string;
  gender: string;
  vaccinated: string;
  petBreed: string;
  petName: string;
  petAge: string;
  description: string;
  location: string;
  contactNumber: string;
  imageUrl: string[];
  amount?: number | string;
}

export interface Pet extends PetDonationCreate {
  id: string;
  userId: string;
  requests: AdoptionRequestBasic[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  ownerDisplayName?: string;
  ownerEmail?: string;
  ownerPhotoURL?: string;
  isFavorite?: boolean;
  minWeight: number;

}

export interface LoginButtonProps {
  onClick: () => void;
  title: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
}

export interface LoginButtonStyles {
  button: ViewStyle;
  buttonText: TextStyle;
}

export interface CustomeHeaderProps {
  title: string;
  DonateScreen?: boolean;
  navigateTo?: string;
  onPress?: () => void;
}

export interface PetCardProps {
  imageUrl: string | string[];
  name: string;
  age?: string | number;
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
  items: { label: string; value: string }[];
}

export interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface CardProps {
  title: string;
  subtitle: string;
  date: string;
  money?: number | string;
  imageUrl?: string;
}

export interface CustomTextProps {
  title: string;
  style?: TextStyle;
}

export interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPet: Pet | null | undefined;
}

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
  Detail: { pet: Pet };
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
  ProfileScreen: { userId?: string };
  PasswordUpdate: undefined;
  AdoptNow: undefined;
  DonateScreen: undefined;
  MyDonationScreen: undefined;
  Main: undefined;
  Drawer: undefined;
  Donate: { donationType: string };
  MyDonations: { filter: 'active' | 'completed' };
  SearchScreen: undefined;
  [key: string]: any; // Index signature for ParamListBase compatibility
}

export interface DrawerParamList {
  AdoptNow: undefined;
  PasswordUpdate: undefined;
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  MainStack: undefined;
  Donate: { donationType?: string };
  MyDonation: { donationType?: string };
  [key: string]: any; // Index signature for ParamListBase compatibility
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
  [key: string]: any; // Index signature for ParamListBase compatibility
}

export interface PasswordUpdateNavigationProp
  extends NativeStackNavigationProp<RootStackParamList, 'PasswordUpdate'> {}

export interface NavigationProps
  extends NativeStackNavigationProp<AppStackParamList, 'PasswordUpdate' | 'DonateScreen'> {}

export interface SignUpScreenNavigationProp
  extends NativeStackNavigationProp<RootStackParamList, 'SignUp'> {}

export interface Props {
  navigation: SignUpScreenNavigationProp;
}

export interface RecoverProps {
  navigation: RecoverPasswordScreenNavigationProp;
}

export interface RootStackNavigationProp
  extends NativeStackNavigationProp<RootStackParamList> {}

export interface AuthStackNavigationProp
  extends NativeStackNavigationProp<AuthStackParamList> {}

export interface AppStackNavigationProp
  extends NativeStackNavigationProp<AppStackParamList> {}

export interface DrawerNavigationProp extends DrawerNavProp<DrawerParamList> {}

export interface TabNavigationProp extends BottomTabNavigationProp<TabParamList> {}

export interface LoginScreenNavigationProp
  extends StackNavigationProp<AuthStackParamList, 'Login'> {}

export interface PasswordUpdateScreenProps
  extends NativeStackScreenProps<AuthStackParamList, 'PasswordUpdate'> {}

export interface DetailScreenProps
  extends NativeStackScreenProps<AppStackParamList, 'Detail'> {}

export interface DonateScreenProps
  extends NativeStackScreenProps<AppStackParamList, 'Donate'> {}

export interface MyDonationsScreenProps
  extends NativeStackScreenProps<AppStackParamList, 'MyDonations'> {}

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
    { name: string; email: string; password: string } | undefined
  >;
  termsAccepted: boolean;
  setTermsAccepted: (termsAccepted: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export interface NavigationProp {
  replace: (screen: string) => void;
}

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
  selectedTab: string;
}

export interface ProfileData {
  displayName: string;
  photoURL: string | null;
  petBreed?: string;
  petType?: string;
  location?: string;
  id?: string;
  name: string;
  email?: string;
  imageUrl: string | null;
  dateJoined?: string;
}

export interface ProfileState {
  loading: boolean;
  error: string | null;
  profileData: ProfileData | null;
}

export interface HomeScreenNavigationProp
  extends StackNavigationProp<RootStackParamList, 'Home'> {}

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface RecoverPasswordScreenNavigationProp
  extends NativeStackNavigationProp<RootStackParamList, 'RecoverPassword'> {}

export interface SearchScreenNavigationProp
  extends StackNavigationProp<RootStackParamList, 'Search'> {}

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

export interface RootState {
  donation: {
    pet: Pet[];
  };
}

export interface AuthStateBasic {
  user: User | null;
  initializing: boolean;
  showSplash: boolean;
  error: string | null;
}

export interface AdoptionRequestSimple {
  userId: string;
  userName: string;
  userEmail: string;
  timestamp: string;
}

export interface FavoriteState {
  favorites: Pet[];
}

export interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export interface FormDataState {
  selectedTab: string;
  searchText: string;
  allPets: Pet[];
}