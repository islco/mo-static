const util = require('util')
const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Given, Then, When, And }) => {
  Given(/^I open the homepage/, () => {
    return client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
  })

  Then(/^the page is accessible for all audiences$/, () => {
    return client.axeCheck('document', {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    })
  })
})
