/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtrctPlugin = require('mini-css-extract-plugin')
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const bulidPath = path.resolve(__dirname, 'build')
const srcPath = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtrctPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd
                ? '[path][name]__[local]'
                : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ]
}

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  target: !isProd ? 'web' : 'browserslist:last 2 versions',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: bulidPath,
    filename: 'bundle.js',
    publicPath: isProd ? '/kts-frontend-summer-2021/' : "/",
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    !isProd && new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    isProd &&
      new MiniCssExtrctPlugin({
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.join(srcPath, 'components'),
      config: path.join(srcPath, 'config'),
      styles: path.join(srcPath, 'styles'),
      utils: path.join(srcPath, 'utils'),
      assets: path.join(srcPath, 'assets'),
      store: path.join(srcPath, 'store'),
      shared: path.join(srcPath, 'shared'),
      pages: path.join(srcPath, 'App/pages'),
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: false,
    }
  },
}
