'use strict';

var gulp        = require('gulp'),
    config      = require('../config'),
    util        = require('util'),
    uglify      = require('gulp-uglify'),
    gutil       = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

var Minify = function() {
  DefaultRegistry.call(this);
  this.set('minify', function(done) {
    gutil.log("-------------------- minify --------------------")
    done();
    return gulp.src(config.path.dist.js + config.path.output.js)
               .pipe(uglify())
               .pipe(gulp.dest(config.path.dist.js));
  });
};

util.inherits(Minify, DefaultRegistry);

module.exports = new Minify();
