'use strict';

var gulp        = require('gulp'),
    config      = require('../config'),
    notify      = require('gulp-notify'),
    util        = require('util'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    pleeease    = require('gulp-pleeease'),
    gutil       = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

var Sass = function() {
  DefaultRegistry.call(this);
  this.set('sass', function(done) {
    gutil.log('------- begin sass -------');

    gulp.src(config.path.scssFile)
        .pipe(sass())
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pleeease({
          "autoprefixer": { "browsers": config.autoprefixer },
          "minifier": false
        }))
        .pipe(gulp.dest(config.path.dist.css));
    done();
  });
};

util.inherits(Sass, DefaultRegistry);

module.exports = new Sass();

