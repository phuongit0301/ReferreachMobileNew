module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-root-import', {
        rootPathPrefix: '~Root',
        rootPathSuffix: 'src',
        extensions: ['.svg'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: [
        ['babel-plugin-root-import', {
          rootPathPrefix: '~Root',
          rootPathSuffix: 'src',
          extensions: ['.svg'],
        }],
        'react-native-reanimated/plugin',
      ]
    }
  }
};
