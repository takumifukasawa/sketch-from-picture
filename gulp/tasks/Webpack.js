'use strict';

var gulp            = require('gulp'),
    config          = require('../config'),
    handleErrors    = require('../lib/handleErrors'),
    gulpif          = require('gulp-if'),
    uglify          = require('gulp-uglify'),
    babel           = require('babel-core'),
    webpack         = require('gulp-webpack'),
    watchify        = require('watchify'),
    babelify        = require('babelify'),
    sourcemaps      = require('gulp-sourcemaps'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    util            = require('util'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify'),
    DefaultRegistry = require('undertaker-registry');

function Webpack() {
  DefaultRegistry.call(this);
  this.set('webpack', function(done) {
    gutil.log('------- begin webpack -------');
    gulp.src(config.path.jsFile)
        .pipe(webpack(config.webpack))
        .pipe(gulpif(false, uglify()))
        .pipe(gulp.dest(config.path.dist.js));
  });
}

util.inherits(Webpack, DefaultRegistry);

module.exports = new Webpack();
