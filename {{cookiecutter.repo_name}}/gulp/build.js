import gulp from 'gulp'
import del from 'del'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import precss from 'precss'
import postcss from 'gulp-postcss'
import sourcemaps from 'gulp-sourcemaps'
import nunjucks from 'gulp-nunjucks'
import envify from 'loose-envify/custom'
import plumber from 'gulp-plumber'
import config from '../config'
import webpack from 'webpack-stream'

export const EXTRAS_GLOB = 'src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2,mp3,mp4,ogv,ogg,webm}'

gulp.task('clean', () => del('public/'))

gulp.task('webpack', (callback) =>
  webpack(require('../webpack.config.js'))
  .pipe(gulp.dest('public/static/js/')))

gulp.task('css', () =>
  gulp.src('src/static/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ precss, autoprefixer ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/static/css/'))
)

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
