import gulp from 'gulp'
import runSequence from 'run-sequence'
import './gulp/build'
import './gulp/production'
import './gulp/utils'
import EXTRAS_GLOB from './gulp/build'


gulp.task('build', (done) => {
  runSequence('clean', ['webpack', 'nunjucks', 'css', 'extras'], done)
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
    open: false
  })

  gulp.watch('src/static/js/**/*.js', ['webpack'])
  gulp.watch('src/static/css/**/*.css', ['css'])
  gulp.watch('src/templates/**/*.html', ['nunjucks'])
  gulp.watch(EXTRAS_GLOB, ['extras'])
})

gulp.task('default', ['build'])
