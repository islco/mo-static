var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/{{ cookiecutter.repo_name }}.js'
  ],
  output: {
    path: path.resolve(__dirname, '{{ cookiecutter.public_path }}', 'js'),
    publicPath: '/',
    filename: 'main.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      // javascript
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel?optional[]=runtime'
      },

      // css
      { test: /\.css$/, loader: "style!css!postcss" },

      // fonts
      { test: /\.woff$/, loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file?prefix=font/' },
      { test: /\.eot$/, loader: 'file?prefix=font/' },
      { test: /\.svg$/, loader: 'file?prefix=font/' },

      // images
      { test: /\.jpeg$/, loader: 'file?prefix=img/' },
      { test: /\.jpg$/, loader: 'file?prefix=img/' },
      { test: /\.png$/, loader: 'file?prefix=img/&limit=10000' },
      { test: /\.gif$/, loader: 'file?prefix=img/' },
      { test: /\.svg$/, loader: 'file?prefix=img/' }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  }
};
