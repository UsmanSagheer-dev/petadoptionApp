import  { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the interface for AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// 2. Create context with default value as undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Implement AuthProvider with proper typing
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Create a custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
