# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}


## Requirements

* Node >=4.4.0
* NPM >=3.0.0

It's recommended that you use a node version manager, like [nvm](https://github.com/creationix/nvm).

```
nvm install
nvm use
```


## Usage

First, install your dependencies:

```
npm install
```

To start a Browser Sync server:

```
npm run dev
```

or to build, cachebust, and minify all assets for production:

```
npm run build
```


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


{% if cookiecutter.use_foundation_sites == 'y' -%}
## Foundation

Foundation Sites 6.2.0 is included with a small set of components included by
default. There is a list of everything you can add at [Foundation's Kitchen Sink](http://foundation.zurb.com/sites/docs/kitchen-sink.html).
To add more, uncomment the appropriate includes from the `app.scss` file along
with the appropriate settings section for the component in the `_.settings.scss`
file. This is described in detail at [Foundation's Sass docs](http://foundation.zurb.com/sites/docs/sass.html#adjusting-css-output).

Foundation's documentation can be found at [foundation.zurb.com](http://foundation.zurb.com/sites/docs/).
To get started with what's included by default, read these docs:

* [Global styles](http://foundation.zurb.com/sites/docs/global.html)
* [Flex Grid](http://foundation.zurb.com/sites/docs/flex-grid.html) and [Media Queries](http://foundation.zurb.com/sites/docs/media-queries.html)
* [Typography](http://foundation.zurb.com/sites/docs/typography-base.html) and [Helper Classes](http://foundation.zurb.com/sites/docs/typography-helpers.html)
* [Forms](http://foundation.zurb.com/sites/docs/forms.html) and [Buttons](http://foundation.zurb.com/sites/docs/button.html)
* [Visibility Classes](http://foundation.zurb.com/sites/docs/visibility.html)
* [Float Classes](http://foundation.zurb.com/sites/docs/float-classes.html)
* [Flexbox Classes](http://foundation.zurb.com/sites/docs/flexbox.html)
{%- endif %}


Generated by [mo static](https://github.com/istrategylabs/mo-static).
