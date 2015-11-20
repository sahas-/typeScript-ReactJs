/* global rimraf */
var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require('browserify'), 
  source = require('vinyl-source-stream'),
  minifyCSS = require('gulp-minify-css'),
  less = require('gulp-less'),
  glob = require ('glob')
  rimraf = require('rimraf'),
  runSequence = require('run-sequence');

gulp.task('clean',function(cb){
    rimraf('build',cb);
});
gulp.task('typescript', function() {
  var tsOut = gulp.src('src/**/*.ts')
    .pipe(ts({
          module:'commonjs',
          target:'ES5',
          experimentalDecorators:true,
          noImplicitAny: true
    }));
  return tsOut.js.pipe(gulp.dest('build'));
});

gulp.task('less', function(){
  gulp.src('./src/styles/**')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));  
});

gulp.task('img', function(){
  gulp.src('./src/images/**')
    .pipe(gulp.dest('./build/images'));  
});

gulp.task('browserify', function() {
  var jsfiles = glob.sync('./build/**/*.js');
  return browserify({
    entries: jsfiles
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'));
});


gulp.task('build',function(cb){
  runSequence('typescript','less','img','browserify',cb);
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ['default']);
});

gulp.task('default',function(cb){
  runSequence('clean','build',cb);
});

