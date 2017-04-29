const util = require('util')
const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Given, Then, When, And }) => {
  Given(/^I open the website$/, () => {
    return client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
  })

  Then(/^the site is accessible for all audiences$/, () => {
    const FAILURE_MSG = '%s issue: %s\n Description: %s \n Target: (%s)\n Type: %s,\n Help: %s \n';
    const PASS_MSG = '%d aXe a11y tests passed';

    return client.axeCheck()
  })
})
