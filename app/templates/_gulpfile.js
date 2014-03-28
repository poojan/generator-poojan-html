(function () {
  'use strict';

  var gulp = require('gulp');
  var jade = require('gulp-jade');
  var stylus = require('gulp-stylus');
  var changed = require('gulp-changed');
  var livereload = require('gulp-livereload');

  gulp.task('jade', function () {
    var src = 'src/jade/*.jade';
    var dest = 'html/';

    gulp.src(src)
        .pipe(jade())
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('stylus', function () {
    var src = 'src/jade/stylesheets/**/*.styl';
    var dest = 'html/css/';

    gulp.src(src)
        .pipe(stylus({ use: ['nib'] }))
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('javascript', function () {
    var src = 'src/js/**/*.js';
    var dest = './html/js/';

    gulp.src(src)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('fixtures', function () {
    var src = 'src/fixtures/**/*.json';
    var dest = './html/fixtures/';

    gulp.src(src)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('lib', function () {
    var src = [
      'src/components/jquery/dist/jquery.js'
    ];
    var dest = './html/lib/';

    gulp.src(src)
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('default', ['javascript', 'stylus', 'jade', 'fixtures', 'lib'], function () {
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/jade/stylesheets/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/fixtures/**/*.json', ['fixtures']);
  });

})();
