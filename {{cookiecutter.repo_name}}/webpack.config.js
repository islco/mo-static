const path = require('path')
const webpack = require('webpack')
const projectConfig = require('./config')

const config = {
  devtool: 'source-map',
  entry: './src/static/js/app',
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2017']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      SECRET_MESSAGE: JSON.stringify(projectConfig.get('SECRET_MESSAGE'))
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
}

module.exports = config
