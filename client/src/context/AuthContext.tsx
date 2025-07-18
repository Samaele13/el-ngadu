import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from "react";
import { getProfileService } from "@/services/authService";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const storedUserData = localStorage.getItem('user_data');

        if (!storedUserData) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const userData = await getProfileService();
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem('user_data');
        }
      } catch (error) {
        console.error("Verifikasi sesi gagal:", error);
        setUser(null);
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) return null;

      return { ...currentUser, ...updatedData } as User;
    });
  };

  const isAuthenticated = !!user;

  const value = { user, isLoading, login, logout, updateUser, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};