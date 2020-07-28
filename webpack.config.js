const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  mode: 'development'
};

module.exports = config;
