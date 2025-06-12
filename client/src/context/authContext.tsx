import { createContext, useState, useEffect, type ReactNode, type FC } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user_data');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Validate that the user object has required properties
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.userType) {
          console.log('Loading user from localStorage:', parsedUser);
          setUser(parsedUser);
        } else {
          console.warn('Invalid user data in localStorage:', parsedUser);
          localStorage.removeItem('user_data');
        }
      }
    } catch (error) {
      console.error("Gagal mem-parsing data user dari localStorage", error);
      localStorage.removeItem('user_data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    console.log('Logging in user:', userData);

    // Ensure userType is properly set
    if (!userData.userType) {
      console.error('User data missing userType:', userData);
      throw new Error('Data user tidak valid: userType hilang');
    }

    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user_data');
  };

  const isAuthenticated = !!user;

  const value = { user, login, logout, isAuthenticated, isLoading };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Memuat sesi...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};