module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 1) Expo Router integration:
      ['expo-router/babel', { 
        roots: ['app']
      }],

      // 2) Your aliases (if you still need them):
      [
        'module-resolver',
        {
          root: ['.'],
          alias: { 
            '@': './' 
          },
        },
      ],

      // 3) **React Native Reanimated must come last**
      'react-native-reanimated/plugin',
    ],
  };
};