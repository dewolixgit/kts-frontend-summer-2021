/* eslint-disable prettier/prettier */
module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  const sourceType = 'unambiguous'

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'mobx',
  ]

  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
  ].filter(Boolean)

  return {
    sourceType,
    presets,
    plugins,
  }
}
