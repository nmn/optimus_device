var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
 
gulp.task('browserify', function() {
    return browserify('./src/js/app.js')
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('stylus', function(){
  gulp.src('./src/css/app.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('default', ['browserify', 'stylus'], function(){
  gulp.watch('./src/js/*.js', function(){
    gulp.run('browserify');
  });
  gulp.watch('./src/css/*.styl', function(){
    gulp.run('stylus');
  });
});