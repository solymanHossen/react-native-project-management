import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SignUpForm } from './SignUpForm';

describe('SignUpForm Component', () => {
  it('renders sign-up fields properly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignUpForm onNavigateToSignIn={jest.fn()} />
    );

    expect(getByPlaceholderText('John Doe')).toBeTruthy();
    expect(getByPlaceholderText('name@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Create a strong password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });

  it('shows error when passwords do not match', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <SignUpForm onNavigateToSignIn={jest.fn()} />
    );

    fireEvent.changeText(getByPlaceholderText('John Doe'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('name@example.com'), 'jane@example.com');
    fireEvent.changeText(getByPlaceholderText('Create a strong password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'differentPass');

    fireEvent.press(getByText('Create Account'));

    expect(await findByText('Passwords do not match')).toBeTruthy();
  });

  it('navigates back to sign in screen when pressed', () => {
    const onNavigateMock = jest.fn();
    const { getByText } = render(<SignUpForm onNavigateToSignIn={onNavigateMock} />);

    fireEvent.press(getByText('Sign In'));
    expect(onNavigateMock).toHaveBeenCalledTimes(1);
  });
});
