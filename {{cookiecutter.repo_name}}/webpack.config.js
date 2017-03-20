const path = require('path')

const config = {
  entry: './src/static/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'bundle.js'
  }
}

module.exports = config
