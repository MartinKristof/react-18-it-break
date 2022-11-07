const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',

  devtool: IS_PRODUCTION ? false : 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss'],
    fallback: {
      buffer: false,
    },
  },
};
