export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  signUp: (credentials: SignUpCredentials) => Promise<boolean>;
  signOut: () => void;
  clearError: () => void;
}
