'use strict';
const path = require('path');
const webpack = require('webpack');
const del = require('del');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new ExtractTextPlugin('style.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['transform-object-assign']
        ]
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
      include: path.join(__dirname, 'app')
    },  {
      test: /\.(jpe?g|png|eot|woff|ttf|gif|svg)(\?.*)?$/i,
      loader: 'file-loader',
      include: path.join(__dirname, 'app')
    }]
  }
};
