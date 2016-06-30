
import shutil


{% if cookiecutter.use_vue_components == 'n' -%}
shutil.rmtree("src/js/components")
{%- endif %}
