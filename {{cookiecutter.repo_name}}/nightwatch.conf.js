const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', 'tests/timeout.js',
    '--require', 'tests/features/step_definitions',
    '--format', 'pretty',
    '--format', 'json:reports/cucumber.json',
    'tests/features']
})

module.exports = {
  output_folder: 'reports',
  custom_assertions_path: '',
  custom_commands_path: './tests/commands',
  live_output: false,
  disable_colors: false,

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:13141',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    }
  }
}
