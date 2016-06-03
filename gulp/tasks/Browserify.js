'use strict';

var gulp            = require('gulp'),
    config          = require('../config'),
    handleErrors    = require('../lib/handleErrors'),
    browserify      = require('browserify'),
    watchify        = require('watchify'),
    babelify        = require('babelify'),
    sourcemaps      = require('gulp-sourcemaps'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    util            = require('util'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify'),
    DefaultRegistry = require('undertaker-registry');

/* 
// es5
function Browserify() {
  DefaultRegistry.call(this);
  this.set('browserify', function(done) {
    gutil.log('------- begin browserify -------');
    browserify({
      entries: [ config.path.devJsDir + config.path.entry.js ],
      debug: true,
      transform: [ 'browserify-shim' ]
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.path.output.js))
    .pipe(gulp.dest(config.path.dist.js));
    done();
  });
}
*/

// es6
function Browserify() {
  DefaultRegistry.call(this);
  this.set('browserify', function(done) {
    gutil.log('------- begin browserify -------');
    browserify({
      entries: [ config.path.devJsDir + config.path.entry.js ],
      debug: true
    })
    .transform("babelify", { presets: ['es2015'] })
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.path.output.js))
    .pipe(gulp.dest(config.path.dist.js));

    /*
    var bundler = watchify(browserify(config.path.devJsDir + config.path.entry.js, { debug: true }).transform(babelify));
    bundler.bundle()
      .on('error', handleErrors)
      .pipe(source(config.path.output.js))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.path.dist.js));
    */
    done();
  });
}

util.inherits(Browserify, DefaultRegistry);

module.exports = new Browserify();
