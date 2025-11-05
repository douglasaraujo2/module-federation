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
const PORT = process.env.PORT || 3001;
const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3002/remoteEntry.js';
module.exports = withZephyr()({
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    port: PORT,
    hot: true
  },
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [{
      test: /\.(ts|tsx|js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-react', '@babel/preset-typescript']
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [new Dotenv({
    systemvars: true
  }), new ModuleFederationPlugin({
    name: 'host',
    remotes: {
      remote: `remote@${REMOTE_URL}`
    },
    shared: {
      react: {
        singleton: true,
        strictVersion: true,
        requiredVersion: '^18.2.0',
        eager: false
      },
      'react-dom': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '^18.2.0',
        eager: false
      }
    }
  }), new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
});