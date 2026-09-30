import { validateEmail, validatePassword, validateFullName, validateSignIn, validateSignUp } from './validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.name+tag@domain.co.uk')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for passwords with 6 or more characters', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('securePassword123')).toBe(true);
    });

    it('returns false for passwords shorter than 6 characters or empty', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('12345')).toBe(false);
    });
  });

  describe('validateFullName', () => {
    it('returns true for names with at least 2 characters', () => {
      expect(validateFullName('John Doe')).toBe(true);
      expect(validateFullName('Al')).toBe(true);
    });

    it('returns false for empty or single character names', () => {
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('A')).toBe(false);
      expect(validateFullName('   ')).toBe(false);
    });
  });

  describe('validateSignIn', () => {
    it('passes for valid credentials', () => {
      const result = validateSignIn({ email: 'user@example.com', password: 'password123' });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('returns errors for empty or invalid fields', () => {
      const result = validateSignIn({ email: 'invalid', password: '123' });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Please enter a valid email address');
      expect(result.errors.password).toBe('Password must be at least 6 characters');
    });
  });

  describe('validateSignUp', () => {
    it('passes for valid sign-up credentials', () => {
      const result = validateSignUp({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        agreeToTerms: true,
      });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('returns error when passwords do not match', () => {
      const result = validateSignUp({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'differentPassword',
        agreeToTerms: true,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.confirmPassword).toBe('Passwords do not match');
    });

    it('returns error when terms are not agreed to', () => {
      const result = validateSignUp({
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        agreeToTerms: false,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.agreeToTerms).toBe('You must agree to the Terms and Conditions');
    });
  });
});
