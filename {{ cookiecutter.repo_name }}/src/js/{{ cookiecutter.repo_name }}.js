
'use strict';

console.log('Hello, {{ cookiecutter.project_name }}');

let dateDisplayEl = document.createElement('div');
dateDisplayEl.innerHTML = new Date();
document.body.appendChild(dateDisplayEl);
