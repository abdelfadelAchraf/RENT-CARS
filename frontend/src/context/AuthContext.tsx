// src/context/AuthContext.tsx
import { createContext, useEffect, useContext, ReactNode, useState } from 'react';
import axios from 'axios';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set up axios default baseURL and interceptors
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Parse user from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    setLoading(false);
  }, []);

  // Store token and user in localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    }
  }, [token, user]);

  // No need for verifyToken function if the API endpoint doesn't exist
  // Instead, we'll rely on the stored user data and token

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(
        '/api/auth/login',
        { email, password }
      );

      if (response.data.token && response.data.user) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return { success: true };
      }
      
      return { 
        success: false, 
        message: 'Login failed: Invalid response from server' 
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post<{ message: string }>(
        '/api/auth/register',
        userData
      );

      return { success: true, message: response.data.message };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};