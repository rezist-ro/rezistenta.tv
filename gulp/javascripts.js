const browserify = require('browserify');
const buffer = require('gulp-buffer');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const paths = require('./paths');
const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify');

module.exports = {
  clean: () => {
    del(`${paths.dest.javascripts}`, {force: true});
  },
  build: () => {
    return gulp.src(`${paths.source.javascripts}/*.js`, {read: false})
      .pipe(tap(function (file) {
        gutil.log('bundling ' + file.path);
        file.contents = browserify(file.path, {debug: true}).bundle();
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dest.javascripts));
  }
};
