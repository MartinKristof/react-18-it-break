/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');
const sharedConfig = require('./webpack.shared.config');

const OUTPUT_DIRECTORY = path.join(__dirname, './build');
const OUTPUT_FILE_NAME = 'bundle.js';

const config = {
  target: 'node',

  entry: './server/server.js',

  output: {
    path: OUTPUT_DIRECTORY,
    filename: OUTPUT_FILE_NAME,
  },

  plugins: [
    sharedConfig.mode === 'development' &&
      new NodemonPlugin({
        watch: OUTPUT_DIRECTORY,
        script: path.join(OUTPUT_DIRECTORY, OUTPUT_FILE_NAME),
      }),
  ].filter(Boolean),
};

module.exports = merge(sharedConfig, config);
