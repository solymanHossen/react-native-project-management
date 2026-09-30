import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders label and placeholder correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Email Address" placeholder="enter your email" />
    );

    expect(getByText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('enter your email')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={onChangeTextMock} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter text'), 'hello@example.com');
    expect(onChangeTextMock).toHaveBeenCalledWith('hello@example.com');
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <Input label="Password" error="Password is required" />
    );

    expect(getByText('Password is required')).toBeTruthy();
  });

  it('toggles password visibility when isPassword is set', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Password" placeholder="Enter password" isPassword />
    );

    const input = getByPlaceholderText('Enter password');
    expect(input.props.secureTextEntry).toBe(true);

    const toggleButton = getByText('Show');
    fireEvent.press(toggleButton);

    expect(getByText('Hide')).toBeTruthy();
  });
});
