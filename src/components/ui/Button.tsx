import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = ({ title, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyle = 'px-5 py-3 rounded-xl items-center justify-center active:opacity-80';
  const variantStyles = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    secondary: 'bg-slate-700 dark:bg-slate-800',
    outline: 'border border-blue-600 bg-transparent',
  };

  const textStyles = {
    primary: 'text-white font-semibold text-base',
    secondary: 'text-white font-semibold text-base',
    outline: 'text-blue-600 dark:text-blue-400 font-semibold text-base',
  };

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <Text className={textStyles[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};
