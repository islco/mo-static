const path = require('path')

const config = {
  entry: './src/static/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
    rules: [
      {
        test: /\.exec.js$/,
        use: ['script-loader']
      }
    ]
  }
}

module.exports = config
