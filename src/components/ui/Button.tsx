import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  disabled = false,
  className = '',
  textClassName = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'py-2 px-4 rounded-xl',
    md: 'py-3.5 px-6 rounded-2xl',
    lg: 'py-4 px-8 rounded-2xl min-h-[52px]',
  };

  const textSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-lg font-bold tracking-wide',
  };

  const variantStyles = {
    primary: 'bg-blue-600 active:bg-blue-700 dark:bg-blue-500 shadow-lg shadow-blue-500/30',
    secondary: 'bg-slate-900 active:bg-slate-800 dark:bg-slate-700 dark:active:bg-slate-600 shadow-md',
    outline: 'border-2 border-blue-600 dark:border-blue-400 bg-transparent active:bg-blue-50 dark:active:bg-blue-950/30',
    ghost: 'bg-transparent active:bg-slate-100 dark:active:bg-slate-800',
  };

  const textVariantStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-600 dark:text-blue-400',
    ghost: 'text-slate-700 dark:text-slate-300',
  };

  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={`items-center justify-center flex-row ${sizeStyles[size]} ${variantStyles[variant]} ${
        isDisabled ? 'opacity-50' : 'active:scale-[0.99]'
      } ${className}`}
      disabled={isDisabled}
      activeOpacity={0.85}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator testID="activity-indicator" color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#ffffff'} size="small" />
      ) : (
        <Text className={`${textSizes[size]} ${textVariantStyles[variant]} ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
