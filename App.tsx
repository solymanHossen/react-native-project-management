import './global.css';

import React, { useState } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from './src/store/useAuthStore';
import { SignInForm } from './src/features/auth/SignInForm';
import { SignUpForm } from './src/features/auth/SignUpForm';
import { Button } from './src/components/ui/Button';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { user, isAuthenticated, signOut } = useAuthStore();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-slate-50 dark:bg-slate-950 px-4 py-8 justify-center items-center"
      keyboardShouldPersistTaps="handled"
    >
      <View className="w-full max-w-md items-center">
        {isAuthenticated && user ? (
          <View className="w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 items-center">
            <View className="h-20 w-20 bg-blue-100 dark:bg-blue-900/40 rounded-full items-center justify-center mb-6 shadow-sm">
              <Text className="text-4xl">🔐</Text>
            </View>

            <Text className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              Authenticated
            </Text>
            <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-1 text-center">
              Welcome, {user.fullName}!
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8">
              {user.email}
            </Text>

            <Button
              title="Sign Out"
              variant="outline"
              size="lg"
              onPress={signOut}
              className="w-full"
            />
          </View>
        ) : currentScreen === 'sign-in' ? (
          <SignInForm
            onNavigateToSignUp={() => setCurrentScreen('sign-up')}
          />
        ) : (
          <SignUpForm
            onNavigateToSignIn={() => setCurrentScreen('sign-in')}
          />
        )}
      </View>
    </ScrollView>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
