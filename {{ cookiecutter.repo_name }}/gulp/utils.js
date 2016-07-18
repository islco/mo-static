import gulp from 'gulp'
import gutil from 'gulp-util'
import tinify from 'gulp-tinify'


gulp.task('tinify', (done) => {
  if (!process.env.TINIFY_API_KEY) {
    gutil.log(gutil.colors.red(
      'No TINIFY_API_KEY specified, get one at https://tinypng.com/developers/subscription'))
    return done()
  }

  return gulp.src('src/**/*.{jpg,jpeg,png}')
    .pipe(tinify(process.env.TINIFY_API_KEY))
    .pipe(gulp.dest('src/'))
})
