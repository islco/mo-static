const http = require('http')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
const nightwatch = require('nightwatch')

// Serve up public/ftp folder
const serve = serveStatic('public/', { 'index': ['index.html'] })

// Create server
const server = http.createServer(function(req, res) {
  const done = finalhandler(req, res)
  serve(req, res, done)
})

const PORT = 13141
// Listen
server.listen(PORT)

nightwatch.runner({
  _: [], // Run single feature file
  config: 'nightwatch.conf.js',
  env: 'default',
  filter: '',
  tag: ''
}, (pass) => {
  process.exit(pass ? 0 : 1)
})
