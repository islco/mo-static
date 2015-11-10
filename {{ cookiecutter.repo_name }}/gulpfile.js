var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var nunjucksRender = require('gulp-nunjucks-render');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');


function bundle(watch) {
  var bundler = browserify('./src/js/{{ cookiecutter.repo_name }}.js', { entry: true, debug: true }).transform(babel);

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) { gutil.log(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./{{ cookiecutter.public_path }}/js/'));
  }

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      gutil.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', function() {
  return bundle();
});

gulp.task('watchify', function() {
  return bundle(true);
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer]))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./{{ cookiecutter.public_path }}/css/'));
});

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['./src/templates/'], { watch: false });
  return gulp.src(['./src/templates/**/*.html', '!**/_*'])
  .pipe(nunjucksRender())
  .pipe(gulp.dest('./{{ cookiecutter.public_path }}/'));
});

gulp.task('start', ['nunjucks', 'sass', 'watchify'], function() {
  browserSync.init({
    server: '{{ cookiecutter.public_path }}',
    files: [
      '{{ cookiecutter.public_path }}/js/**/*.js',
      '{{ cookiecutter.public_path }}/css/**/*.css',
      '{{ cookiecutter.public_path }}/**/*.html'
    ]
  });

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html', ['nunjucks']);
});

gulp.task('banner', ['browserify'], function() {
  return gulp.src(['banner.txt', './{{ cookiecutter.public_path }}/js/bundle.js'])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./{{ cookiecutter.public_path }}/js/'));
});


gulp.task('default', ['browserify', 'nunjucks', 'sass']);

gulp.task('build-dev', ['default', 'start']);
gulp.task('build', ['default', 'banner']);
