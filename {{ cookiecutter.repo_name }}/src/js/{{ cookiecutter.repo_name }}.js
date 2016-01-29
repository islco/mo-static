'use strict';


console.log('Hello, {{ cookiecutter.project_name }}');

const dateDisplayEl = document.createElement('div');
dateDisplayEl.innerHTML = new Date();
document.body.appendChild(dateDisplayEl);

{% if cookiecutter.use_foundation_sites == 'y' -%}
const $ = require('jquery');
const foundation = require('foundation-sites');

$(document).foundation();
{%- endif %}
