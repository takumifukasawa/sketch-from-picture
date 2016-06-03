'use strict';

var gulp            = require('gulp'),
    config          = require('../config'),
    util            = require('util'),
    browser         = require('browser-sync'),
    gutil           = require('gulp-util'),
    DefaultRegistry = require('undertaker-registry');

function Server() {
  DefaultRegistry.call(this);
  this.set('server', function(done) {
    gutil.log('------- begin server -------');
    browser({
      server: {
        baseDir: config.path.base.distDir
      },
      startPath: config.path.base.browseRootFile,
      files: [
        "**/*.css",
        "**/*.js",
        "**/*.html"
      ]
    });
    done();
  });
  this.set('reload', function(done) {
    browser.reload({
      stream: true
    });
    done();
  });
}


util.inherits(Server, DefaultRegistry);

module.exports = new Server();
