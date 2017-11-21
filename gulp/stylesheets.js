const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const paths = require('./paths');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

module.exports = {
  clean() {
    del(`${paths.dest.stylesheets}`, {force: true});
  },
  build() {
    const postCSSPlugins = [
      autoprefixer({browsers: ['last 2 versions']}),
      cssnano()
    ];

    return gulp.src(`${paths.source.stylesheets}/**/*.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postCSSPlugins))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dest.stylesheets));
  }
};
