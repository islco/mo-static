'use strict';

const fs             = require('fs');
const path           = require('path');
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
const critical       = require('critical').stream;
const runSequence    = require('run-sequence');

// npm 3.* flattens node_modules in such a way that consolidates common
// dependencies into one node_modules directory at the root of a project. If
// this project is installed as a dependency of another, then we can't count on
// there being a node_modules directory on the same level of this project. So
// we search upwards for the nearest node_modules directory and use that for
// reference
const nodeModules = (() => {
  // TODO: Make configurable?
  const maxAttempts = 10;
  let   attempt = 1;
  let   base = 'node_modules';
  let   modulesPath;

  while(true && attempt <= maxAttempts) {
    let   stats;
    const upOne = path.resolve(base);
    try {
      stats = fs.statSync(upOne);
      if (stats.isDirectory()) {
        modulesPath = upOne;
        break;
      }
    } catch(e) { /* The node_modules folder wasn't found here */ }
    attempt += 1;
    base = '../' + base;
  }
  return modulesPath;
})();

if (!nodeModules) {
  throw new Error('Could not locate an npm_modules directory');
}

function bundle(options) {
  options = options || {};
  const bundlerOpts = { entry: true, debug: true };
  let bundler = browserify(
    './src/js/{{ cookiecutter.repo_name }}.js', bundlerOpts
    )
    .transform('babelify', { presets: ['es2015'] });

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
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
    {% if cookiecutter.use_foundation == 'n' -%}
    .pipe(sass().on('error', sass.logError))
    {%- endif %}
    {% if cookiecutter.use_foundation == 'y' -%}
    .pipe(sass({
      includePaths: [
        path.join( nodeModules, '/zurb-foundation-5/scss/')
      ]
    }).on('error', sass.logError))
    {%- endif %}
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

gulp.task('minify', ['rev:replace', 'critical'], () => {
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

gulp.task('critical', ['rev:replace'], function() {
  return gulp.src('public/**/*.html')
  .pipe(critical({
    base: 'public/',
    inline: true
  }))
  .pipe(gulp.dest('public/'));
});

gulp.task('clean', () => {
  return del('./public/');
});

gulp.task('default', ['browserify', 'nunjucks', 'sass', 'extras']);
gulp.task('prod', ['banner', 'rev:replace', 'minify', 'critical']);

gulp.task('build-dev', (done) => {
  runSequence('clean',
              ['default', 'start'],
              done);
});

gulp.task('build', (done) => {
  runSequence('clean',
              ['default', 'prod'],
              done);
});
