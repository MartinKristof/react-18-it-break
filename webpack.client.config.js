const path = require('path');
const { merge } = require('webpack-merge');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const sharedConfig = require('./webpack.shared.config.js');

const OUTPUT_DIRECTORY = path.join(__dirname, './build/client');
const STATIC_PORT = 4000;
const SERVER_PORT = 3000;

const config = {
  target: 'web',

  entry: './src/index.js',

  output: {
    path: OUTPUT_DIRECTORY,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].bundle.js',
    publicPath:
      sharedConfig.mode === 'production'
        ? `http://localhost:${SERVER_PORT}/client/`
        : `http://localhost:${STATIC_PORT}/`,
  },

  devServer: {
    port: STATIC_PORT,
    liveReload: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },

  plugins: [new WebpackAssetsManifest()].filter(Boolean),
};

module.exports = merge(sharedConfig, config);
