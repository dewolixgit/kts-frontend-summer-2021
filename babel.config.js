module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    process.env.NODE_ENV === 'development' && 'react-refresh/babel'
  ].filter(Boolean);

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
      "mobx"
    ],
    plugins
  }



}