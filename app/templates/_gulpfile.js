(function () {
  'use strict';

  var gulp = require('gulp');
  var jade = require('gulp-jade');
  var stylus = require('gulp-stylus');
  var livereload = require('gulp-livereload');
  var rjs = require('gulp-requirejs');

  gulp.task('jade', function () {
    var src = 'src/jade/*.jade';
    var dest = 'src/';

    gulp.src(src)
        .pipe(jade())
        .pipe(gulp.dest(dest))
        .pipe(livereload());
  });

  gulp.task('stylus', function () {
    gulp.src('src/jade/stylesheets/**/*.styl')
        .pipe(stylus({ use: ['nib'] }))
        .pipe(gulp.dest('./src/css'))
        .pipe(livereload());
  });

  gulp.task('javascript', function () {
    gulp.src('src/js/**/*.js')
        .pipe(livereload());
  });

  gulp.task('default', ['javascript', 'stylus', 'jade'], function () {
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/jade/stylesheets/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['javascript']);
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

    //gulp.src([
      //'src/js/bootstrap.js',
      //'src/js/app.js'
    //])
    //.pipe(gulp.dest('build/js/'));

    //gulp.src('src/js/**/*.js')
    rjs({
      baseUrl: 'src/js/',
      name: 'main',
      out: 'main.js',
      //mainConfigFile: 'src/js/main.js',
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
