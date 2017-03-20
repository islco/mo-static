{% if cookiecutter.use_foundation_sites == 'y' -%}
import $ from 'jquery'
import 'foundation'
import 'foundation-mediaquery'
import WebFont from 'webfontloader'


// initialize foundation
$(document).foundation()

// Async web font loading
// WebFont.load({
//     custom: {
//         families: [],
//         urls: ['/static/css/fonts.css']
//     }
//  })

{%- endif %}
// example
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
