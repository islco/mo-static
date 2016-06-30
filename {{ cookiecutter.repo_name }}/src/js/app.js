{% if cookiecutter.use_foundation_sites == 'y' -%}
import $ from 'jquery'
import 'foundation'
import 'foundation-mediaquery'
{% if cookiecutter.use_vue_components == 'y' -%}
import Vue from 'vue'
import Header from './components/header/index.vue'
{%- endif %}

// initi\alize foundation
$(document).foundation()

{%- endif %}

{% if cookiecutter.use_vue_components == 'y' -%}
const App = new Vue({
  el: 'body',
  components: {
    'header-component': Header
  }
})
{%- endif %}
// example
const dateDisplayEl = document.createElement('div')
dateDisplayEl.innerHTML = new Date()
document.body.appendChild(dateDisplayEl)
