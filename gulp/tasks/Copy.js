/////////////////////////////////////////////
// # init
/////////////////////////////////////////////

'use strict';

var gulp        = require('gulp'),
    config      = require('../config'),
    util        = require('util'),
    gutil       = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

var Copy = function() {
  DefaultRegistry.call(this);

  this.set('copy', function(done) {
    gutil.log("-------------------- copy --------------------")

    done();
    return gulp.src([
      config.path.dist.root + '**/*.html',
      config.path.dist.root + 'images/**/*.{jpeg,jpg,png,gif,svg,ico}',
      config.path.dist.root + 'css/**/*.css',
      config.path.dist.root + 'js/**/*.js',
      config.path.dist.root + 'sounds/**/*.mp3',
      config.path.dist.root + 'sounds/**/*.mp4',
      '!' + config.path.dist.root + '**/mock/**/*.*'
    ], {
      base: config.path.dist.root
    })
    .pipe(gulp.dest(config.path.deploy));

  });
};

util.inherits(Copy, DefaultRegistry);

module.exports = new Copy();
