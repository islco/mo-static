var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['start']);

gulp.task('build-dev', ['webpack:build-dev'], function() {
  gulp.watch(['{{ cookiecutter.repo_name }}/**/*'], ['webpack:build-dev']);
});

gulp.task('build', ['scss', 'html',  'webpack:build']);

gulp.task('webpack:build', function(done) {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    done();
  });
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

var devBundler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function(done) {
  devBundler.run(function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task('scss', function() {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer]))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./{{ cookiecutter.public_path }}/css'));
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./{{ cookiecutter.public_path }}'));
})

gulp.task('start', ['webpack:build-dev', 'scss', 'html'], function() {
  browserSync.init({
    server: {
      baseDir: '{{ cookiecutter.public_path }}'
    },
    files: [
      '{{ cookiecutter.public_path}}/js/**/*.js',
      '{{ cookiecutter.public_path}}/css/**/*.css',
      '{{ cookiecutter.public_path}}/**/*.html'
    ]
  });

  gulp.watch('./src/js/**/*.js', ['webpack:build-dev']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/**/*.html', ['html']);
});
