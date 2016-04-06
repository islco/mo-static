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
* [CleanCSS](https://github.com/jakubpawlowicz/clean-css/tree/3.4)
* [html-minifier](https://github.com/kangax/html-minifier)
* [Critical](https://github.com/addyosmani/critical)
* [loadCSS](https://github.com/filamentgroup/loadCSS)


## Usage

Create a new project from the mo-static template using cookiecutter:

```
brew install cookiecutter
cookiecutter gh:istrategylabs/mo-static
```

Follow the prompts to configure your project with the available options. When
finished, `cd` into your project, installed npm dependencies with `npm i`, and
quickly get started by running `npm run dev`. There is extended documentation
for the project itself in the [project README.md](https://github.com/istrategylabs/mo-static/blob/master/%7B%7B%20cookiecutter.repo_name%20%7D%7D/README.md).
