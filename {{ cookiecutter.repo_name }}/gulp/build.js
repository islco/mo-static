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
import critical from 'critical'
import CONFIG from '../config'

const COMPATIBILITY = ['last 2 versions', 'Firefox ESR', 'not ie <= 10']  // see https://github.com/ai/browserslist#queries
export const EXTRAS_GLOB = 'src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}'

let bundler = browserify({ entry: true, debug: true })
  .add('src/js/app.js')
  .transform('eslintify', { continuous: true })
  .transform('babelify')
  .transform(envify(CONFIG))
  .transform('uglifyify')

function bundle() {
  return bundler.bundle()
    .on('error', err => {
      gutil.log(gutil.colors.red(err.message))
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'))
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
  gulp.src('src/scss/**/*.scss')
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
      browsers: COMPATIBILITY,
    })]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/css/')))

gulp.task('nunjucks', () =>
  gulp.src(['src/templates/**/*.html', '!**/_*'])
    .pipe(plumber())
    .pipe(nunjucks.compile(CONFIG, {
      throwOnUndefined: true,
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/')))

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('public/')))

gulp.task('critical', () =>
  gulp.src('public/**/*.html')
    .pipe(critical.stream({
      base: 'public/',
      inline: true,
      dimensions: [{
        width: 1336,  // desktop
        height: 768,
      }, {
        width: 1024,  // tablet
        height: 768,
      }, {
        width: 360,  // mobile
        height: 640,
      }],
    }))
    .pipe(gulp.dest('public/')))
