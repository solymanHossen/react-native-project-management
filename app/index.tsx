import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../src/components/ui/Button';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-slate-900 px-6">
      <View className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg items-center border border-slate-100 dark:border-slate-700">
        <View className="h-16 w-16 bg-blue-100 dark:bg-blue-900/40 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">🚀</Text>
        </View>

        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          NativeWind v5 RC
        </Text>

        <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 leading-relaxed">
          Tailwind CSS v4 is configured and working perfectly in your Expo Router project.
        </Text>

        <View className="w-full gap-y-3">
          <Button title="Get Started" variant="primary" className="w-full" />
          <Button title="Documentation" variant="outline" className="w-full" />
        </View>
      </View>
    </View>
  );
}
