'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

var src = {
  html: ['src/*.html'],
  css: ['src/assets/css/**/*.css'],
  components: ['src/components/**/*.js', 'src/components/**/*.html']
};

gulp.task('connect', function() {
  return connect.server({
    root: 'src',
    port: 5000,
    livereload: true
  });
});

gulp.task('css', function() {
  return gulp.src(src.css)
  .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src(src.html)
  .pipe(connect.reload());
});

gulp.task('components', function () {
  return gulp.src(src.components)
  .pipe(connect.reload());
});

gulp.task('css:watch',function() {
  return gulp.watch(src.css, ['css']);
});

gulp.task('components:watch',function() {
  return gulp.watch(src.components, ['components']);
});

gulp.task('html:watch', function () {
  return gulp.watch(src.html, ['html']);
});

gulp.task('server', ['connect', 'html:watch', 'css:watch', 'components:watch']);
