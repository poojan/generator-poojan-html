(function () {
  'use strict';

  var gulp = require('gulp');
  var jade = require('gulp-jade');
  var stylus = require('gulp-stylus');
  var changed = require('gulp-changed');
  var livereload = require('gulp-livereload');
  var rjs = require('gulp-requirejs');

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


  gulp.task('default', ['javascript', 'stylus', 'jade', 'fixtures'], function () {
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/jade/stylesheets/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/fixtures/**/*.json', ['fixtures']);
  });

  gulp.task('build', function () {
    var src = 'src/jade/*.jade';
    var dest = 'build/';

    gulp.src(src)
        .pipe(jade())
        .pipe(gulp.dest(dest));

    gulp.src('src/jade/stylesheets/**/*.styl')
        .pipe(stylus({ use: ['nib'] }))
        .pipe(gulp.dest('./build/css'));

    gulp.src('src/js/require.js')
        .pipe(gulp.dest('build/js/'));

    rjs({
      baseUrl: 'src/js/',
      name: 'main',
      out: 'main.js',
      paths: {
        'domReady': './src/components/requirejs-domready/domReady',
        'angular': './src/components/angular/angular'
      },
      shim: {
        'angular': { 'exports': 'angular' }
      },
      almond: true
    })
    .pipe(gulp.dest('./build/js/'));
  });
})();
