# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}


## Requirements:

- Node 6.10.x
- [nvm](https://github.com/creationix/nvm)
- [yarn](http://yarnpkg.com/)

## Installation

```
$ nvm install
$ yarn
```

## Quick Start

```
$ nvm use
$ npm run dev
$ npm test
```

## Usage

First, install your dependencies, there is a `yarn.lock` file, make sure you have yarn installed globally:

```
yarn
```

To start a hot reload dev server and watch files for development:

```
npm run dev
```

and then run tests when you're done making changes:

```
npm test
```

or to build, cachebust, and minify all assets for production:

```
npm run build
```

You can also optimize PNG and JPEG images using [tinify](https://www.npmjs.com/package/tinify):

1. Set the `TINIFY_API_KEY` environment variable to your Tinify api key, [get one here](https://tinypng.com/developers).

2. `npm run tinify`

## SUIT CSS

mo-static uses [SUIT CSS](https://suitcss.github.io/) to package its css but it does more than just that. Suit comes with a bunch of CSS packages such as a grid and buttons. It also ships with a whole bunch of utilities for text positioning, visibility and layout. All of these components and utils are included by default since we import suit completely in `app.css`. Some useful docs of utilities and components include:

- [Grid component](https://github.com/suitcss/components-grid/)
- [Button component](https://github.com/suitcss/components-button/)
- [Text utilities (alignment, truncation, line breaks) ](https://github.com/suitcss/utils-text)
- [Display utilities (block, inline, hidden)](https://github.com/suitcss/utils-display)
- [Position utilities (relative, absolute, full screen](https://github.com/suitcss/utils-position)

A list with all utilities can be found [here](https://github.com/suitcss/utils) and a list with all components can be found [here](https://github.com/suitcss/components)

## Configuration

[convict](https://github.com/mozilla/node-convict) is used to handle configuration which lives in `config.js`.

The convict instance just holds a JavaScript object. In there you can define all variables you like. If they have an `env` key the default value will be overwritten if the value is present in the environment variables. If you want to be even more specific with values only being present in some environments you can uncomment these lines and create the appropriate files:

```javascript
// var env = config.get('env');
// config.loadFile('./config/' + env + '.json');
```

`gulp-nunjucks` automatically passes all this data when it compiles your HTML. This means you can just output `{% raw %}{{ SECRET_MESSAGE }}{% endraw %}` within your HTML and the compiler will replace it with whatever value you have configured.

As for the JS you need to explicitly indicate which values you want passed to your code via webpack to prevent passing any sensitive data. You can do so by modifying the `webpack.config.js` file, we use the `DefinePlugin` to make our environment variables available in our code. This means you can use `process.env.SECRET_MESSAGE` in your Javascript files and the appropriate environment variable will be substituted during the build process to be shipped in the browser.

__⚠️ WARNING__: Due to how Heroku pipelines work, the environment variables are piped into your code during build time. This means that when you promote an app from staging to production within a pipeline that the environment variables from staging will also make it to prdouction, since Heroku doesn't build again on production.

__🔐 TIP:__ Don't leak secret keys, neither by commmitting them nor by passing them to your JS. If the var you are
using should be kept secret, you should not add it to `config.js`.

## Testing

[Nightwatch Cucumber](https://github.com/mucsi96/nightwatch-cucumber) is included for E2E testing of the project. Tests are written in [gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) syntax and then implemented as steps matching the lines of gherkin.

## Standard

[Standard](https://github.com/feross/standard) is used for static analysis of JavaScript files. Standard, compared to ESlint allows/needs no configuration, if you really need to suppress a warning you can take a look [here](https://github.com/feross/standard#how-do-i-hide-a-certain-warning).

## Stylelint

[Stylelint](https://github.com/stylelint/stylelint) is used for static analysis of CSS files. There is a suitcss config installed for Stylelint. All configuration lives in `stylelint.config.js` , it exports a object that can be passed to the suitcss preprocessor in `build.js` and be used when running `npm run lint`

* 4 spaces for indentation.
* Properties in alphabetical order
* Only single quotes.
* No vendor prefixes (autoprefixer is enabled).
* Max of 2 adjacent empty lines.
* Required empty line between nested selectors, except first nested.

## Deploying to Heroku
To deploy your new `mo-static` project to Heroku you'll need these buildpacks, in this order:

- Nodejs: `heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs -a <my-app>`
- Heroku Static Buildpack `heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git -a <my-app>`



Generated by [mo static](https://github.com/istrategylabs/mo-static).