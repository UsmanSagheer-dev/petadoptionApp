export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: User | null;
  profileData: any | null;
  initializing: boolean;
  showSplash: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
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
  handleRegister: () => Promise<{name: string; email: string; password: string} | undefined>;
  termsAccepted: boolean;
  setTermsAccepted: (termsAccepted: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}
export interface ValidationRule {
    condition: boolean;
    message: string;
  }
export interface AuthStateBasic {
  user: User | null;
  initializing: boolean;
  showSplash: boolean;
  error: string | null;
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