'use strict';

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    config      = require('../config'),
    util        = require('util'),
    data        = require('gulp-data'),
    jade        = require('gulp-jade'),
    gutil       = require('gulp-util'),
    fs          = require('fs'),
    DefaultRegistry = require('undertaker-registry');

var Jade = function() {
  DefaultRegistry.call(this);
  this.set('jade', function() {
    gutil.log("-------------------- jade --------------------")
    return gulp.src(config.path.jadeEntry)
               .pipe(plumber())
               //.pipe(cache())
               /*
               .pipe(data(function(file) {
                   return require(config.path.jsonFile)
               }))
               .pipe(jade({
                   pretty: true
               }))
                */
               .pipe(jade({
                   data: JSON.parse(fs.readFileSync(config.path.jsonFile)),
                   pretty: false
               }))
               .pipe(gulp.dest(config.path.dist.html))
  });
};

util.inherits(Jade, DefaultRegistry);

module.exports = new Jade();
