# Mo Static

> You want a static template? Because mo-static is how you get a static
template.

Mo-static is a static project template with batteries included.


## Features

* [cookiecutter](https://github.com/audreyr/cookiecutter)
* [editorconfig](http://editorconfig.org/)
* [nconf](https://github.com/indexzero/nconf)
* [Gulp](http://gulpjs.com/)
* [Browserify](http://browserify.org/) (w/[Babel](https://babeljs.io/) and [envify](https://github.com/hughsk/envify))
* [ESLint](http://eslint.org/) (w/[Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnbbase))
* [SASS](https://github.com/dlmanning/gulp-sass) (w/[Autoprefixer](https://autoprefixer.github.io/))
* [Stylelint](https://github.com/stylelint/stylelint) (w/[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern))
* [Nunjucks](https://mozilla.github.io/nunjucks/)
* [BrowserSync](http://www.browsersync.io/)
* [UglifyJS](https://github.com/mishoo/UglifyJS2/)
* [CleanCSS](https://github.com/jakubpawlowicz/clean-css/tree/3.4)
* [html-minifier](https://github.com/kangax/html-minifier)
* [Critical](https://github.com/addyosmani/critical)
* [loadCSS](https://github.com/filamentgroup/loadCSS)


## Usage

Create a new project from the mo-static template using [cookiecutter](https://github.com/audreyr/cookiecutter):

```
brew install cookiecutter
cookiecutter gh:istrategylabs/mo-static
```

Follow the prompts to configure your project with the available options. When
finished, `cd` into your project, installed npm dependencies with `npm i`, and
quickly get started by running `npm run dev`. There is extended documentation
for the project itself in the [project README.md](https://github.com/istrategylabs/mo-static/blob/master/%7B%7B%20cookiecutter.repo_name%20%7D%7D/README.md).


## What to change

### Favicon

Two favicon files are included and should be changed to be appropriate for the project.
Follow the [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet) for
best practices, and create at [least these images](https://github.com/audreyr/favicon-cheat-sheet#the-images):

| Sizes | Name | Purpose |
|---|---|---|---|---|
| 16x16 & 32x32 | favicon.ico | Default required by IE. Chrome and Safari may pick ico over png, sadly. |
| 152x152 | favicon-152.png | General use iOS/Android icon, auto-downscaled by devices. |

You can use ImageMagick to generate `.ico` files for you which is detailed in
the [Helpful Tools](https://github.com/audreyr/favicon-cheat-sheet#helpful-tools) section.


### Structured Data

[Structured Data](https://developers.google.com/structured-data/) tags are included to provide better data for search engine indexes.
By default, the [Logo's](https://developers.google.com/structured-data/customize/logos) and
[Social Profile Links](https://developers.google.com/structured-data/customize/social-profiles) are
included. Different tags will apply for every project, so they should be added when appropriate.

* Update the [Logo's](https://developers.google.com/structured-data/customize/logos) and [Social Profile Links](https://developers.google.com/structured-data/customize/social-profiles) tags with the appropriate values.
* Add additional tags based on Google's [Promote Your Content with Structured Data Markup](https://developers.google.com/structured-data/) guidelines.
* Use the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/) to verify the tags are set up correctly.
* Optionally, [Ask Google to re-crawl your URLs](https://support.google.com/webmasters/answer/6065812?hl=en&ref_topic=4617736&rd=1) after deploying to update your web page in Google's search indexes.

### Facebook Open Graph Tags

Some Open Graph tags are included as defined by Facebook's [Sharing Best Practices for Websites](https://developers.facebook.com/docs/sharing/best-practices).
If more tags apply, add them as defined by the [Open Graph Protocol](http://opengraphprotocol.org/).

* Update the tags defined in the [Use proper Open Graph tags](https://developers.facebook.com/docs/sharing/best-practices#tags) with the appropriate values.
* Add an absolute URL to an image per the [Optimize images to generate great previews](https://developers.facebook.com/docs/sharing/best-practices#images) section, ideally 1200x630 pixels in size, but no smaller than 600x315 pixels and under 8MB.
* Use the [Facebook URL Debugger](https://developers.facebook.com/tools/debug) to pre-cache the image and verify the tags are set up correctly.

### Twitter Card Tags

Twitter [Summary Card with Large Image](https://dev.twitter.com/cards/types/summary-large-image)
tags are included to prominently display image content on tweets.

* Update the tags defined in the Reference section with the appropriate values.
* Add an absolute URL to an image per the `twitter:image` tag reference, at least 280x150 pixels in size and under 1MB.
* Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator) to pre-cache the image and verify the tags are set up correct.

### robots.txt

By default, the `robots.txt` file is configured to disallow search spiders. Depending on your project,
you should change this to meet your needs, see [robotstxt.org](http://www.robotstxt.org/robotstxt.html).

### humans.txt

By default, the `humans.txt` file only lists ISL as a contributor. You should add project contributors
to this list. Also, you should add any special thanks, and update technology colophone to be appropriate
for the project. See [humanstxt.org](http://humanstxt.org/Standard.html).
