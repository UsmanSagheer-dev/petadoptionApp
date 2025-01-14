import { User } from 'firebase/auth';

// Define the AuthContext type
export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  checkAuthStatus: () => Promise<void>;
}