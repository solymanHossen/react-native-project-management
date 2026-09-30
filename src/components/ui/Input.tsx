import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  isPassword = false,
  containerClassName = '',
  className = '',
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(isPassword);

  const toggleSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const getBorderColor = () => {
    if (error) return 'border-red-500 dark:border-red-400 bg-red-50/20';
    if (isFocused) return 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-800';
    return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60';
  };

  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 tracking-wide">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center border-2 rounded-2xl px-4 py-3.5 ${getBorderColor()}`}
      >
        <TextInput
          className={`flex-1 text-slate-900 dark:text-white text-base py-1 ${className}`}
          placeholderTextColor="#94a3b8"
          secureTextEntry={isPassword ? isSecure : secureTextEntry}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={toggleSecure}
            activeOpacity={0.7}
            className="ml-2 px-2 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"
          >
            <Text className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isSecure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text className="text-sm font-medium text-red-500 dark:text-red-400 mt-1.5 ml-1">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 ml-1">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};
