var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require('browserify'), 
  source = require('vinyl-source-stream'),
  minifyCSS = require('gulp-minify-css'),
  less = require('gulp-less'),
  glob = require ('glob')
  rimraf = require('rimraf');


gulp.task('clean',function(cb){
    rimraf('build',cb);
});
gulp.task('typescript', function () {
  var tsOut = gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      module: 'commonjs'
    }));
  return tsOut.js.pipe(gulp.dest('build'));
});

gulp.task('less', function(){
  gulp.src('./src/styles/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));  
});

gulp.task('img', function(){
  gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./build/images'));  
});

gulp.task('browserify', function() {
  var jsfiles = glob.sync('./build/components/*.js');
  return bundler = browserify({
    entries: jsfiles,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'));
});


gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ['default']);
});

gulp.task('default', ['typescript','less','img', 'browserify']);
