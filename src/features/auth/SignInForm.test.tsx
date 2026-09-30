import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SignInForm } from './SignInForm';

describe('SignInForm Component', () => {
  it('renders all form fields and submit button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignInForm onNavigateToSignUp={jest.fn()} />
    );

    expect(getByPlaceholderText('name@example.com')).toBeTruthy();
    expect(getByPlaceholderText('••••••••')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText("Don't have an account?")).toBeTruthy();
  });

  it('shows validation error messages when submitting empty form', async () => {
    const { getByText, findByText } = render(
      <SignInForm onNavigateToSignUp={jest.fn()} />
    );

    fireEvent.press(getByText('Sign In'));

    expect(await findByText('Please enter a valid email address')).toBeTruthy();
    expect(await findByText('Password must be at least 6 characters')).toBeTruthy();
  });

  it('calls onNavigateToSignUp when link is pressed', () => {
    const onNavigateMock = jest.fn();
    const { getByText } = render(<SignInForm onNavigateToSignUp={onNavigateMock} />);

    fireEvent.press(getByText('Sign Up'));
    expect(onNavigateMock).toHaveBeenCalledTimes(1);
  });
});
