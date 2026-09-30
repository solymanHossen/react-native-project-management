import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validateSignIn } from '../../utils/validation';
import { useAuthStore } from '../../store/useAuthStore';

interface SignInFormProps {
  onNavigateToSignUp: () => void;
  onSuccess?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onNavigateToSignUp,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, isLoading, error: authError, clearError } = useAuthStore();

  const handleSignIn = async () => {
    clearError();
    const validation = validateSignIn({ email, password });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const success = await signIn({ email, password });
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <View className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Welcome Back 👋
        </Text>
        <Text className="text-base text-slate-500 dark:text-slate-400">
          Sign in to access your account and continue.
        </Text>
      </View>

      {/* Global Auth Error Alert */}
      {authError && (
        <View className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
          <Text className="text-sm font-semibold text-red-600 dark:text-red-400">
            {authError}
          </Text>
        </View>
      )}

      {/* Form Fields */}
      <View className="mb-2">
        <Input
          label="Email Address"
          placeholder="name@example.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          isPassword
          error={errors.password}
        />
      </View>

      {/* Forgot Password */}
      <View className="flex-row justify-end mb-6">
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <Button
        title="Sign In"
        onPress={handleSignIn}
        isLoading={isLoading}
        size="lg"
        className="w-full mb-6"
      />

      {/* Social Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
        <Text className="mx-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Or continue with
        </Text>
        <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
      </View>

      {/* Social Buttons */}
      <View className="flex-row gap-x-4 mb-8">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 items-center justify-center flex-row"
        >
          <Text className="text-base font-semibold text-slate-800 dark:text-slate-200">
            🌐 Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 items-center justify-center flex-row"
        >
          <Text className="text-base font-semibold text-slate-800 dark:text-slate-200">
             Apple
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Redirect */}
      <View className="flex-row items-center justify-center">
        <Text className="text-sm text-slate-500 dark:text-slate-400 mr-1.5">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={onNavigateToSignUp} activeOpacity={0.7}>
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
