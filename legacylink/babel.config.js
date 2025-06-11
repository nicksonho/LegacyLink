module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ← first, the Expo Router plugin:
      ['expo-router/babel', { 
        // tells it where to find your “app/” folder
        roots: ['app']
      }],

      // ← then your module‐resolver alias (if you still need it):
      [
        'module-resolver',
        {
          root: ['.'],
          alias: { '@': './' },
        },
      ],
    ],
  };
};