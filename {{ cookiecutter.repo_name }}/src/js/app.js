{% if cookiecutter.use_foundation_sites == 'y' -%}
import $ from 'jquery'
import foundation from 'foundation-sites'  // eslint-disable-line no-unused-vars


$(document).foundation()

{%- endif %}
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
