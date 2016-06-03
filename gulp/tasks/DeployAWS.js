'use strict';

var gulp            = require('gulp'),
    config          = require('../config'),
    awspublish      = require('gulp-awspublish'),
    util            = require('util'),
    fs              = require('fs'),
    gutil           = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

var DeployAWS = function() {
  DefaultRegistry.call(this);

  this.set('deployAWS', function() {
    gutil.log("-------------------- deploy --------------------");
    var key         = JSON.parse(fs.readFileSync('./config/aws-credentials.json')),
        publisher   = awspublish.create(key),
        headers     = {
          'Cache-Control': 'max-age=315360000, no-transform, public'
        },
        srcDir      = config.path.distDir + "**/*.*";
    gulp.src(srcDir)
        .pipe(publisher.publish())
        //.pipe(publisher.publish(headers))
        .pipe(publisher.sync())
        .pipe(publisher.cache())
        .pipe(awspublish.reporter({
            states: ['create', 'update', 'delete']
        }));
  });
};


util.inherits(DeployAWS, DefaultRegistry);

module.exports = new DeployAWS();
