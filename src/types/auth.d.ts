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
}
