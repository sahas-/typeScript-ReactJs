var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require('browserify'), 
  source = require('vinyl-source-stream'),
  glob = require ('glob'),
  runSequence = require('run-sequence'),
  connect = require('gulp-connect'),
  clean = require('gulp-clean'),
  stylus = require('gulp-stylus'),
  minifyCss = require('gulp-minify-css'),
  autoPrefix = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  shell = require('gulp-shell'),
  rimraf = require('rimraf'),
  mocha = require('gulp-mocha');
  

var config = {
  allSrc:'src/**',
  destRoot: './build',
  html: {
    src: './index.html',
    dest: './build'
  },
  styles: {
    src: './src/styles/**',
    name: 'main.css',
    dest: './build/css'
  },
  typescript:{
    src:'./src/**/*.ts',
    target:'ES5',
    module:'commonjs'
  },
  images:{
    src:'./src/images/**',
    dest:'./build/images/'
  },
  javascript: {
    src: './build/**/*.js',
    __tests__: './build/**/__tests__/*.js',
    entry: './build/index.js',
    bundleName: 'bundle.js',
  }
};  


gulp.task('html',function(){
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.destRoot));
})

gulp.task('typescript', function() {
  var tsOut = gulp.src(config.typescript.src)
    .pipe(ts({
          module:config.typescript.module,
          target:config.typescript.target,
          experimentalDecorators:true,
          noImplicitAny: false
    }));
  return tsOut.js.pipe(gulp.dest(config.destRoot));
});

gulp.task('less', function(){
  gulp.src(config.styles.src)
    .pipe(stylus())
    .pipe(autoPrefix())
    .pipe(minifyCss())
    .pipe(gulp.dest(config.styles.dest));  
});


gulp.task('img', function(){
  gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));  
});

gulp.task('browserify',['typescript'], function() {
  var jsfiles = glob.sync(config.javascript.src,{ignore:[config.javascript.__tests__,'../node_modules/rewire'], realpath: true});
  return browserify({
    entries: jsfiles
  })
  .bundle()
  .pipe(source(config.javascript.bundleName))
  .pipe(gulp.dest(config.destRoot));
});

//==============================all build commandline tasks ================

gulp.task('clean', function() {
  return gulp.src(config.destRoot, {
      read: false
    })
    .pipe(clean());
});

gulp.task('build',['browserify','html','img','less'],function(){

})

gulp.task('dev', ['default'], function() {
  return connect.server({
    root: config.destRoot,
    livereload: true
  });
});

gulp.task('watch', function () {
    gulp.watch(config.allSrc, ['default']);
});

gulp.task('default',function(cb){
  runSequence('clean','build','unit-test',cb);
});

gulp.task('unit-test', function () {
    return gulp.src(config.javascript.__tests__, {read: false})
        .pipe(mocha());
});

