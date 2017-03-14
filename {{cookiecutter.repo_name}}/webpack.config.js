const path = require('path')

const config = {
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
  }
}

module.exports = config
