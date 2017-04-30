// Injects axe-core and tests the page for accessibility
// https://github.com/gerardkcohen/nightwatch-a11y-testing/blob/0d3e320e604bd98930f3be7dccea42cf25517268/commands/aXeCheck.js

const fs = require('fs')
const util = require('util')

exports.command = function (context, config, callback) {

  const axeCore = fs.readFileSync(require.resolve('axe-core'), 'utf8')
  const FAILURE_MSG = '%s issue: %s\n Description: %s \n Target: (%s)\n Type: %s,\n Help: %s \n'
  const PASS_MSG = '%d aXe a11y tests passed'

  this.execute(function (axe) {
    var s

    if (!document.querySelector('#nightwatch-axe')) {
      s = document.createElement('script')
      s.id = 'nightwatch-axe'
      s.text = axe
      document.head.appendChild(s)
    }
  }, [axeCore])

  this.executeAsync(function (context, config, done) {
    axe.a11yCheck((context == 'document') ? document : context, config, function (result) {
      done(result)
    })
  }, [context, config], function (results) {
    if (results.status < 0) {
      throw new Error(results.value.message)
    }

    const value = results.value
    const violations = value.violations
    const passes = value.passes

    if (violations.length) { // we got failures
      violations.forEach(function (violation) {
        violation.nodes.forEach(function (node) {
          const check = node.any[0] || node.none[0] || node.all[0]

          this.verify.fail(check.message, violation.help, util.format(FAILURE_MSG, node.impact, check.message, violation.description, node.target, violation.id, violation.helpUrl))
        }, this)
      }, this)
    } else {
      this.assert.ok(true, util.format(PASS_MSG, passes.length))
    }
  })

  return this
}
