import gulp from 'gulp'
import gutil from 'gulp-util'
import del from 'del'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import stylelint from 'gulp-stylelint'
import sourcemaps from 'gulp-sourcemaps'
import nunjucks from 'gulp-nunjucks'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import envify from 'loose-envify/custom'
import plumber from 'gulp-plumber'
import vinylify from 'factor-vinylify'
import config from '../config'

export const EXTRAS_GLOB = 'src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2,mp3,mp4,ogv,ogg,webm}'

let bundler = browserify({
  entries: [
    'app.js',
  ],
  fullPaths: true,
  basedir: './{{ bookiecutter.repo_name }}/static/js/',
  debug: true,
}).plugin(vinylify, {
  outputs: [
    'app.bundle.js',
  ],
})
.transform('eslintify', { continuous: true })
.transform('babelify')
.transform(envify(config.get()))
.transform('uglifyify')

function bundle() {
  return bundler.bundle()
    .on('error', err => {
      gutil.log(gutil.colors.red(err.message))
      this.emit('end')
    })
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/static/js/'))
}

gulp.task('clean', () => del('public/'))

gulp.task('browserify', () => bundle())

gulp.task('watchify', () => {
  const watchify = require('watchify')
  bundler = watchify(bundler)
  bundler.on('update', () => {
    gutil.log('-> bundling...')
    bundle()
  })
  return bundle
})

gulp.task('sass', () =>
  gulp.src('src/static/scss/**/*.scss')
    .pipe(plumber())
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [{
        formatter: 'string',
        console: true,
      }],
      failAfterError: false,
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({% if cookiecutter.use_foundation_sites == 'y' -%}{
      includePaths: ['node_modules/foundation-sites/scss'],
    }{%- endif %}))
    .pipe(postcss([autoprefixer({
      // see https://github.com/ai/browserslist#queries
      // and https://github.com/google/web-starter-kit/blob/128b2efdab595e0a4c8a563fcf1d1724ef98b8aa/gulpfile.babel.js#L73
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    })]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/static/css/')))

gulp.task('nunjucks', () =>
  gulp.src(['src/templates/**/*.html', '!**/_*'])
    .pipe(plumber())
    .pipe(nunjucks.compile(config.get(), {
      throwOnUndefined: true,
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/')))

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('public/')))
