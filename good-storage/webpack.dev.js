const path = require('path');
const webpack = require('webpack');
const Version = require('./package.json').version;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'storage.js',
    library: 'storage',
		libraryTarget: 'umd',
		publicPath: '/assets/'
  },
  module: {
    preLoaders: {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    },
    loaders: {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
  ]
}
