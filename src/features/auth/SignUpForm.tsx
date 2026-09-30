import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validateSignUp } from '../../utils/validation';
import { useAuthStore } from '../../store/useAuthStore';

interface SignUpFormProps {
  onNavigateToSignIn: () => void;
  onSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onNavigateToSignIn,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signUp, isLoading, error: authError, clearError } = useAuthStore();

  const handleSignUp = async () => {
    clearError();
    const validation = validateSignUp({
      fullName,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const success = await signUp({
      fullName,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    });
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <View className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Create Account ✨
        </Text>
        <Text className="text-base text-slate-500 dark:text-slate-400">
          Sign up now to get started with your journey.
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
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
          }}
          error={errors.fullName}
        />

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
          placeholder="Create a strong password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          isPassword
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }}
          isPassword
          error={errors.confirmPassword}
        />
      </View>

      {/* Terms & Conditions Checkbox */}
      <TouchableOpacity
        onPress={() => {
          setAgreeToTerms(!agreeToTerms);
          if (errors.agreeToTerms) setErrors((prev) => ({ ...prev, agreeToTerms: '' }));
        }}
        activeOpacity={0.8}
        className="flex-row items-center mb-6"
      >
        <View
          className={`w-6 h-6 rounded-lg border-2 items-center justify-center mr-3 ${
            agreeToTerms
              ? 'bg-blue-600 border-blue-600'
              : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
          }`}
        >
          {agreeToTerms && <Text className="text-white text-xs font-bold">✓</Text>}
        </View>
        <Text className="text-sm text-slate-600 dark:text-slate-400 flex-1">
          I agree to the{' '}
          <Text className="text-blue-600 dark:text-blue-400 font-semibold">Terms of Service</Text>{' '}
          and{' '}
          <Text className="text-blue-600 dark:text-blue-400 font-semibold">Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      {errors.agreeToTerms && (
        <Text className="text-sm font-medium text-red-500 dark:text-red-400 mb-4 -mt-4 ml-1">
          {errors.agreeToTerms}
        </Text>
      )}

      {/* Submit Button */}
      <Button
        title="Create Account"
        onPress={handleSignUp}
        isLoading={isLoading}
        size="lg"
        className="w-full mb-6"
      />

      {/* Sign In Redirect */}
      <View className="flex-row items-center justify-center">
        <Text className="text-sm text-slate-500 dark:text-slate-400 mr-1.5">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={onNavigateToSignIn} activeOpacity={0.7}>
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
