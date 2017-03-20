import gulp from 'gulp'
import runSequence from 'run-sequence'
import './gulp/build'
import './gulp/production'
import './gulp/utils'
import EXTRAS_GLOB from './gulp/build'


gulp.task('build', (done) => {
  runSequence('clean', ['webpack', 'nunjucks', 'sass', 'extras'], done)
})

gulp.task('build:production', (done) => {
  runSequence('build', 'rev:replace', ['minify:html', 'minify:css', 'minify:js'],
              'purifycss', 'critical', done)
})

gulp.task('watch', ['build'], () => {
  const browserSync = require('browser-sync')
  browserSync({
    server: 'public',
    files: 'public/**/*',
  })

  gulp.watch('src/static/scss/**/*.scss', ['sass'])
  gulp.watch('src/templates/**/*.html', ['nunjucks'])
  gulp.watch(EXTRAS_GLOB, ['extras'])
})

gulp.task('default', ['build'])
