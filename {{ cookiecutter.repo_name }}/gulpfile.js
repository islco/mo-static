'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const del = require('del')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const stylelint = require('gulp-stylelint')
const sourcemaps = require('gulp-sourcemaps')
const nunjucks = require('gulp-nunjucks')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const envify = require('loose-envify/custom')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const htmlmin = require('gulp-htmlmin')
const cleancss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const critical = require('critical').stream
const purifycss = require('gulp-purifycss')
const header = require('gulp-header')
const runSequence = require('run-sequence')
const vueify = require('vueify')
const fs = require('fs')

const BANNER = fs.readFileSync('banner.txt', 'utf8').replace('@date', (new Date()))
const CONFIG = require('./config').get()
const COMPATIBILITY = ['last 2 versions', 'Firefox ESR', 'not ie <= 10']  // see https://github.com/ai/browserslist#queries
const EXTRAS_GLOB = 'src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}'

let bundler = browserify({ entry: true, debug: true })
  .add('src/js/app.js')
  .transform(vueify)
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


gulp.task('clean', () => {
  return del('public/')
})

gulp.task('browserify', () => {
  return bundle()
})

gulp.task('watchify', () => {
  const watchify = require('watchify')
  bundler = watchify(bundler)
  bundler.on('update', () => {
    gutil.log('-> bundling...')
    bundle()
  })
  return bundle
})

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [ { formatter: 'string', console: true } ],
      failAfterError: false
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({% if cookiecutter.use_foundation_sites == 'y' -%}{
      includePaths: ['node_modules/foundation-sites/scss']
    }{%- endif %}))
    .pipe(postcss([autoprefixer({
      browsers: COMPATIBILITY
    })]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/css/'))
})

gulp.task('nunjucks', () => {
  return gulp.src(['src/templates/**/*.html', '!**/_*'])
    .pipe(plumber())
    .pipe(nunjucks.compile(CONFIG, {
      throwOnUndefined: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/'))
})

gulp.task('extras', () => {
  return gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('public/'))
})

gulp.task('critical', () => {
  return gulp.src('public/**/*.html')
    .pipe(critical({
      base: 'public/',
      inline: true,
      dimensions: [{
        width: 1336,  // desktop
        height: 768
      }, {
        width: 1024,  // tablet
        height: 768
      }, {
        width: 360,  // mobile
        height: 640
      }]
    }))
    .pipe(gulp.dest('public/'))
})

gulp.task('watch', ['watchify'], () => {
  const browserSync = require('browser-sync').create()
  browserSync.init({
    server: 'public',
    files: 'public/**/*'
  })

  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/**/*.html', ['nunjucks'])
  gulp.watch(EXTRAS_GLOB, ['extras'])
})

gulp.task('rev', () => {
  return gulp.src(['public/**/*', '!**/*.html', '!**/*.txt', '!**/*.ico'])
    .pipe(rev())
    .pipe(gulp.dest('public/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/'))
})

gulp.task('rev:replace', ['rev'], () => {
  const manifest = gulp.src('public/rev-manifest.json')
  return gulp.src('public/**/*')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest('public/'))
})

gulp.task('purifycss', () => {
  return gulp.src('public/**/*.css')
    .pipe(purifycss(['public/**/*.js', 'public/**/*.html']))
    .pipe(gulp.dest('public/'))
})

gulp.task('minify:html', () => {
  return gulp.src(['public/**/*.html'])
    .pipe(plumber())
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {
        preserveComments: 'license',
        compressor: { screw_ie8: true }
      },
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('public/'))
})

gulp.task('minify:css', () => {
  return gulp.src('public/**/*-*.css')
    .pipe(cleancss())
    .pipe(header(BANNER))
    .pipe(gulp.dest('public/'))
})

gulp.task('minify:js', () => {
  return gulp.src('public/**/*-*.js')
    .pipe(uglify({
      preserveComments: 'license',
      compressor: { screw_ie8: true },
      output: { preamble: BANNER }
    }))
    .pipe(gulp.dest('public/'))
})

gulp.task('build', (done) => {
  runSequence('clean', ['browserify', 'nunjucks', 'sass', 'extras'], 'critical', done)
})

gulp.task('build:production', (done) => {
  runSequence('build', 'rev:replace', 'purifycss', ['minify:html', 'minify:css', 'minify:js'], done)
})

gulp.task('start', (done) => {
  runSequence('build', 'watch', done)
})

gulp.task('default', ['build'])
