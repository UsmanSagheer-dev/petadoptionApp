import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
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

export interface PetDonation {
  id?: string;
  petType: string;
  gender: string;
  vaccinated: string;
  petBreed: string;
  amount: string;
  weight: string;
  location: string;
  description: string;
  errorText?: string;
  imageUrl?: string;
  age?:any;
  isFavorite?:boolean
  toggleFavoriteStatus?:any,
  id?: string;
  title: string;
  subtitle: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp | null; // 🔥 Handle undefined/null
  money?: number;
  requests?:any; //
 
}
