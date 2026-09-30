const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativewind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = withNativewind(
  mergeConfig(getDefaultConfig(__dirname), config)
);
