# Mo Static

> You want a static template? Because mo-static is how you get a static
template.

Mo-static is a static project template with batteries included.

## Features

* [cookiecutter](https://github.com/audreyr/cookiecutter)
* [editorconfig](http://editorconfig.org/)
* [ESLint](http://eslint.org/)
* [Gulp](http://gulpjs.com/)
* [SASS](https://github.com/dlmanning/gulp-sass) (w/[Autoprefixer](https://autoprefixer.github.io/))
* [Browserify](http://browserify.org/) (w/[Babel](https://babeljs.io/))
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [BrowserSync](http://www.browsersync.io/)
* [UglifyJS](https://github.com/mishoo/UglifyJS2/)
* [cssnano](https://github.com/ben-eb/cssnano)
* [html-minifier](https://github.com/kangax/html-minifier)
* [Critical](https://github.com/addyosmani/critical)


## Usage

Create a new project from the mo-static template using cookiecutter:

```
pip install cookiecutter
cookiecutter gh:istrategylabs/mo-static
```

Follow the prompts to configure your project with the available options. When
finished, it will run post-install scripts that install the npm dependencies in
your project. Then, you can `cd` into your project and quickly get started by
running `npm run start`. There is extended documentation for the project itself
in the [project README.md](https://github.com/istrategylabs/mo-static/blob/master/%7B%7B%20cookiecutter.repo_name%20%7D%7D/README.md).
