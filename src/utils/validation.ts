import { SignInCredentials, SignUpCredentials, ValidationResult } from '../types/auth';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateSignIn = (credentials: SignInCredentials): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateEmail(credentials.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePassword(credentials.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSignUp = (credentials: SignUpCredentials): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateFullName(credentials.fullName)) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  if (!validateEmail(credentials.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePassword(credentials.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (credentials.password !== credentials.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!credentials.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the Terms and Conditions';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
