var convict = require('convict');

var config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  secretMessage: {
    doc: 'Some test secret message.',
    format: String,
    default: 'WHAZZAAAAHHHHH'
  }
})

// Load environment dependent configuration if desired
// var env = config.get('env');
// config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
