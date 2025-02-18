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
  id: string;
  userId: string;
  petType: string;
  gender: string;
  vaccinated: string;
  petBreed: string;
  requests: AdoptionRequest[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  petName: string;
  petAge: string;
  description: string;
  location: string;
  contactNumber: string;
  imageUrls: string[];
  money?: number;
}
