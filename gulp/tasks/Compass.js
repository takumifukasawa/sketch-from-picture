'use strict';

var gulp        = require('gulp'),
    config      = require('../config'),
    notify      = require('gulp-notify'),
    util        = require('util'),
    plumber     = require('gulp-plumber'),
    pleeease    = require('gulp-pleeease'),
    compass     = require('gulp-compass'),
    gutil       = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

var Compass = function() {
  DefaultRegistry.call(this);
  this.set('compass', function(done) {
    gutil.log('------- begin compass -------');

    gulp.src(config.path.scssFile)
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(compass({
          config_file: config.path.compassConfig,
          comments: false,
          css: config.path.dist.css,
          sass: config.path.scssDir
        }))
        .pipe(pleeease({
          "autoprefixer": { "browsers": config.autoprefixer },
          "minifier": false
        }))
        .pipe(gulp.dest(config.path.dist.css));
    done();
  });
};

util.inherits(Compass, DefaultRegistry);

module.exports = new Compass();

