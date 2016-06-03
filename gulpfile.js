'use strict';

/////////////////////////////////////////////
// # modules
/////////////////////////////////////////////

var gulp        = require('gulp'),
    config      = require('./gulp/config'),
    gutil       = require('gulp-util'),
    fs          = require('fs'),
    source      = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserify  = require(config.path.tasks + 'Browserify.js'),
    webpack     = require(config.path.tasks + 'Webpack.js'),
    server      = require(config.path.tasks + 'Server.js'),
    sass        = require(config.path.tasks + 'Sass.js'),
    compass     = require(config.path.tasks + 'Compass.js'),
    autoprefixer = require(config.path.tasks + 'AutoPrefixer.js'),
    sprite      = require(config.path.tasks + 'Sprite.js'),
    jade        = require(config.path.tasks + 'Jade.js'),
    copy        = require(config.path.tasks + 'Copy.js'),
    minify      = require(config.path.tasks + 'Minify.js'),
    deployAWS   = require(config.path.tasks + 'DeployAWS.js');

/////////////////////////////////////////////
// # browserify
/////////////////////////////////////////////

gulp.registry(browserify);
gulp.task('browserify', gulp.series('browserify', function(done) {
  done();
}));

/////////////////////////////////////////////
// # webpack
/////////////////////////////////////////////

gulp.registry(webpack);
gulp.task('webpack', gulp.series('webpack', function(done) {
  done();
}));

/////////////////////////////////////////////
// # server
/////////////////////////////////////////////

gulp.registry(server);
gulp.task('server', gulp.series('server', function(done) {
  done();
}));

/////////////////////////////////////////////
// # sass
/////////////////////////////////////////////

gulp.registry(sass);
gulp.task('sass', gulp.series('sass', function(done) {
  done();
}));

/////////////////////////////////////////////
// # compass
/////////////////////////////////////////////

gulp.registry(compass);
gulp.task('compass', gulp.series('compass', function(done) {
  done();
}));

/////////////////////////////////////////////
// # autoprefixer
/////////////////////////////////////////////

gulp.registry(autoprefixer);
gulp.task('autoprefixer', gulp.series('autoprefixer', function(done) {
  done();
}));


/////////////////////////////////////////////
// # deploy
/////////////////////////////////////////////

gulp.registry(deployAWS);
gulp.task('deploy', gulp.series('deployAWS', function(done) {
  done();
}));

/////////////////////////////////////////////
// # minify
/////////////////////////////////////////////

gulp.registry(minify);
gulp.task('minify', gulp.series('minify', function(done) {
  done();
}));

/////////////////////////////////////////////
// # copy
/////////////////////////////////////////////

gulp.registry(copy);
gulp.task('copy', gulp.series('copy', function(done) {
  done();
}));

/////////////////////////////////////////////
// # sprite
/////////////////////////////////////////////

gulp.registry(sprite);
gulp.task('sprite-pc', gulp.series('makeSpritePC', function(done) {
  done();
}));
gulp.task('sprite-sp', gulp.series('makeSpriteSP', function(done) {
  done();
}));

/////////////////////////////////////////////
// # jade
/////////////////////////////////////////////

gulp.registry(jade);
gulp.task('jade', gulp.series('jade', function(done) {
  gulp.series('reload');
  done();
}));

/////////////////////////////////////////////
// # build
/////////////////////////////////////////////

gulp.task('build', gulp.series('jade', 'webpack', 'sass', function(done) {
  gulp.series('reload');
  done();
}));


/////////////////////////////////////////////
// # watch
/////////////////////////////////////////////

gulp.task('watch', function() {
  var watcherScss = gulp.watch(config.path.scssFile, gulp.series('sass'));
  watcherScss.on('change', function(event) {
    gutil.log("onchange!");
  });

  var watcherJade = gulp.watch(config.path.jadeFile, gulp.series('jade'));
  watcherJade.on('change', function(event) {
    gutil.log('onchange!');
  });

  var watcherJs = gulp.watch(config.path.jsFile, gulp.series('browserify'));
  //var watcherJs = gulp.watch(config.path.jsFile, gulp.series('webpack'));
  watcherJs.on('change', function(event) {
    gutil.log('onchange!');
  });
});

/////////////////////////////////////////////
// # default
/////////////////////////////////////////////

gulp.task('default', gulp.series('server', 'watch', function(done) {
  done();
}));
