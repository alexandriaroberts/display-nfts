module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        importSource: 'theme-ui/core', // or '@theme-ui/core'
        runtime: 'automatic',
        throwIfNamespace: false,
      },
    ],
  ],
  // ...
};
