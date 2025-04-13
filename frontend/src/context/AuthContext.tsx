// src/context/AuthContext.tsx
import { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  // Add other registration fields as needed
}

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
};

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false
  });

  // Load Google Auth API
  useEffect(() => {
    // Load Google's authentication SDK
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="apis.google.com/js/platform.js"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        // Initialize Google Auth when script loads
        window.google?.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
          callback: handleGoogleCallback
        });
      };
    };
    
    loadGoogleScript();
  }, []);

  // Callback function for Google Auth
  const handleGoogleCallback = async (response: any) => {
    try {
      // Send ID token to backend for verification
      const result = await axios.post('http://localhost:5000/api/auth/google', {
        token: response.credential
      });
      
      const { token, user } = result.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set default Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update context state
      dispatch({
        type: 'LOGIN',
        payload: user
      });
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  // Check for existing token on app load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Configure axios with token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token validity with backend
          const response = await axios.get<{ user: User }>('http://localhost:5000/api/auth/verify');
          
          if (response.data.user) {
            dispatch({ 
              type: 'LOGIN', 
              payload: response.data.user 
            });
          }
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user: User }>('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Set default Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Update context state
      dispatch({
        type: 'LOGIN',
        payload: response.data.user
      });

      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post<{ message: string }>('http://localhost:5000/api/auth/register', userData);
      
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  // Google Login function
  const loginWithGoogle = async () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google authentication not loaded');
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Update context state
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Add this declaration to make TypeScript happy with the Google API
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: () => void) => void;
        }
      }
    }
  }
}