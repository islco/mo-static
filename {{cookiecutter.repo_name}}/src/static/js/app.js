{% if cookiecutter.use_foundation_sites == 'y' -%}
import 'script-loader!jquery'
import 'script-loader!jquery-migrate'
import 'script-loader!foundation-sites'
import 'script-loader!foundation-sites/js/foundation.util.mediaQuery.js'


// initialize foundation
$(document).foundation()

{%- endif %}
// example
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
