import gulp from 'gulp'
import tinify from 'gulp-tinify'


gulp.task('tinify', (done) => {
  if (process.env.TINIFY_API_KEY) {
    return gulp.src('src/**/*.{jpg,png}')
      .pipe(tinify(process.env.TINIFY_API_KEY))
      .pipe(gulp.dest('src/'))
  } else {
    gutil.log(gutil.colors.red('No TINIFY_API_KEY specified, get one at https://tinypng.com/developers/subscription'))
    done()
  }
})
