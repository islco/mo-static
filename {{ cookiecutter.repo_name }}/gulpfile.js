'use strict';

const gulp           = require('gulp');
const gutil          = require('gulp-util');
const del            = require('del');
const concat         = require('gulp-concat');
const browserSync    = require('browser-sync').create();
const autoprefixer   = require('autoprefixer');
const postcss        = require('gulp-postcss');
const sass           = require('gulp-sass');
const sourcemaps     = require('gulp-sourcemaps');
const nunjucksRender = require('gulp-nunjucks-render');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const browserify     = require('browserify');
const watchify       = require('watchify');
const rev            = require('gulp-rev');
const revReplace     = require('gulp-rev-replace');
const uglify         = require('gulp-uglify');
const minifyCss      = require('gulp-minify-css');
const htmlmin        = require('gulp-htmlmin');
const gulpif         = require('gulp-if');
const runSequence    = require('run-sequence');


function bundle(options) {
  options = options || {};
  const bundlerOpts = { entry: true, debug: true };
  let bundler = browserify('./src/js/franklin-dashboard.js', bundlerOpts)
    .transform('babelify', { presets: ['es2015'] });

  function rebundle() {
    return bundler.bundle()
      .on('error', (err) => {
        gutil.log(gutil.colors.red(err.message));
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/js/'));
  }

  if (options.watch) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      gutil.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', () => {
  return bundle();
});

gulp.task('watchify', () => {
  return bundle({ watch: true });
});

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('nunjucks', () => {
  nunjucksRender.nunjucks.configure(['./src/templates/'], { watch: false });
  return gulp.src(['./src/templates/**/*.html', './src/js/**/*.html', '!**/_*'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('./public/'));
});

gulp.task('extras', () => {
  return gulp.src('./src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg}')
    .pipe(gulp.dest('./public/'));
});

gulp.task('start', ['nunjucks', 'sass', 'extras', 'watchify'], () => {
  browserSync.init({
    server: 'public',
    files: './public/**/*'
  });

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html', ['nunjucks']);
  gulp.watch('./src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg}', ['extras']);
});

gulp.task('rev', ['default', 'banner'], () => {
  return gulp.src(['./public/**/*', '!**/*.html'], { base: './public' })
    .pipe(rev())
    .pipe(gulp.dest('./public/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./public/'));
});

gulp.task('rev:replace', ['rev'], () => {
  const manifest = gulp.src('./public/rev-manifest.json');
  return gulp.src('./public/**/*')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('banner', ['browserify'], () => {
  return gulp.src(['banner.txt', './public/js/bundle.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('minify', ['rev:replace'], () => {
  return gulp.src(['./public/**/*'], { base: './public/' })
    // Only target the versioned files with the hash
    // Those files have a - and a 10 character string
    .pipe(gulpif(/-\w{10}\.js$/, uglify()))
    .pipe(gulpif(/-\w{10}\.css$/, minifyCss()))
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('./public/'));
});

gulp.task('clean', () => {
  return del('./public/');
});

gulp.task('default', ['browserify', 'nunjucks', 'sass', 'extras']);

gulp.task('build-dev', (done) => {
  const sequence = ['default', 'start'];
  runSequence('clean', sequence, done);
});

gulp.task('build', (done) => {
  const sequence = ['default', 'banner', 'rev:replace', 'minify'];
  runSequence('clean', sequence, done);
});
