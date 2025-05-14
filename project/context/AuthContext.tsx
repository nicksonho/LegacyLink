import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { User, AuthState } from '@/types';

// Define the shape of our context
type AuthContextType = {
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'student' | 'alumni') => Promise<void>;
  signOut: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component that wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check if user is already logged in
  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      // In a real app, you would check for a stored token or session
      // For this example, we'll simulate a loading delay
      setTimeout(() => {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        // Navigate to auth screen if not authenticated
        if (!authState.isAuthenticated) {
          router.replace('/(auth)/login');
        }
      }, 1000);
    } catch (error) {
      console.error('Failed to check user session:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      router.replace('/(auth)/login');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // In a real app, you would send a request to your backend API
      // For this example, we'll simulate a successful login for any input
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Simulate API response
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'student',
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      };
      
      // Update auth state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const signUp = async (email: string, password: string, name: string, role: 'student' | 'alumni') => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // In a real app, you would send a request to your backend API
      // For this example, we'll simulate a successful registration
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role }),
      });
      
      // Simulate API response
      const user: User = {
        id: '1',
        name: name,
        email: email,
        role: role,
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      };
      
      // Update auth state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Registration failed. Please try again.');
    }
  };

  const signOut = () => {
    // Clear auth state
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    // Navigate to login screen
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}