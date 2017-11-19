const gulp = require('gulp');
const javascripts = require('./gulp/javascripts');
const paths = require('./gulp/paths');
const stylesheets = require('./gulp/stylesheets');


// stylesheets
gulp.task('stylesheets:clean', () => {
  return stylesheets.clean();
});

gulp.task('stylesheets:build', ['stylesheets:clean'], () => {
  return stylesheets.build();
});

gulp.task('stylesheets:watch', () => {
  gulp.watch(`${paths.source.stylesheets}/**/*`, ['stylesheets:build']);
});


// javascripts
gulp.task('javascripts:clean', () => {
  return javascripts.clean();
});

gulp.task('javascripts:build', ['javascripts:clean'], () => {
  return javascripts.build();
});

gulp.task('javascripts:watch', () => {
  gulp.watch(`${paths.source.javascripts}/**/*`, ['javascripts:build']);
});


// general
gulp.task('build', ['stylesheets:build', 'javascripts:build']);
gulp.task('default', ['build']);
gulp.task('watch', ['build', 'stylesheets:watch', 'javascripts:watch']);
