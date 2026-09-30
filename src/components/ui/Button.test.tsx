import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button title correctly', () => {
    const { getByText } = render(<Button title="Sign In" />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('triggers onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Submit" onPress={onPressMock} />);

    fireEvent.press(getByText('Submit'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('displays loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Submit" isLoading testID="btn-loading" />
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
    expect(queryByText('Submit')).toBeNull();
  });

  it('is disabled when isDisabled prop is passed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" disabled onPress={onPressMock} />
    );

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
