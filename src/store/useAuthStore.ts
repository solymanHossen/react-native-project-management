import { create } from 'zustand';
import { AuthState, SignInCredentials, SignUpCredentials, User } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signIn: async (credentials: SignInCredentials): Promise<boolean> => {
    set({ isLoading: true, error: null });

    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));

      if (credentials.email === 'invalid@example.com' || credentials.password === 'wrongpassword') {
        set({
          isLoading: false,
          error: 'Invalid email or password',
          isAuthenticated: false,
          user: null,
        });
        return false;
      }

      const mockUser: User = {
        id: 'usr_123',
        email: credentials.email,
        fullName: credentials.email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err) {
      set({
        isLoading: false,
        error: 'An unexpected authentication error occurred',
        isAuthenticated: false,
      });
      return false;
    }
  },

  signUp: async (credentials: SignUpCredentials): Promise<boolean> => {
    set({ isLoading: true, error: null });

    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));

      const mockUser: User = {
        id: `usr_${Date.now()}`,
        email: credentials.email,
        fullName: credentials.fullName,
        createdAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err) {
      set({
        isLoading: false,
        error: 'Failed to create account. Please try again.',
        isAuthenticated: false,
      });
      return false;
    }
  },

  signOut: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
