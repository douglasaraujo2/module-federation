const {
  withZephyr
} = require("zephyr-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  ModuleFederationPlugin
} = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const path = require('path');

// Load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3002;
module.exports = withZephyr()({
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    port: PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Card': './src/components/Card',
        './Header': './src/components/Header',
        './AppStore': './src/store/AppStore',
      },
      shared: {
        react: { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, strictVersion: true, requiredVersion: '^18.2.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
});