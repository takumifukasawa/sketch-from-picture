'use strict';

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    util        = require('util'),
    config      = require('../config'),
    gutil       = require('gulp-util'),
    pleeease    = require('gulp-pleeease'),
    DefaultRegistry = require('undertaker-registry');

var AutoPrefixer = function() {
  DefaultRegistry.call(this);
  this.set('autoprefixer', function(done) {
    gutil.log("-------------------- autoprefixer --------------------");
    done();
    return gulp.src(config.path.cssFile)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pleeease({
                "autoprefixer": { "browsers": config.autoprefixer },
                "minifier": false
        }))
        .pipe(gulp.dest(config.path.cssDir));
  });
};

util.inherits(AutoPrefixer, DefaultRegistry);

module.exports = new AutoPrefixer();
