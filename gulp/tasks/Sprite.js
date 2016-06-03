'use strict';

var gulp        = require('gulp'),
    config      = require('../config'),
    plumber     = require('gulp-plumber'),
    util        = require('util'),
    gutil       = require('gulp-util'),
    spritesmith = require('gulp.spritesmith'),
    DefaultRegistry = require('undertaker-registry');

var pc = config.path.sprite.pc,
    sp = config.path.sprite.sp;

var make = function(data) {
 var sprite_data =
      gulp.src(data.src)
          .pipe(plumber())
          .pipe(spritesmith({
              // 生成する画像名
              imgName: data.imgName,
              // cssに記述されるパス
              imgPath: data.imgPath,
              // 生成するcss
              cssName: data.cssName,
              // 生成するcssのフォーマット
              cssFormat: 'scss',
              // css内に記述される名前のベース
              cssVarMap: data.cssVarMap,
              cssSpritesheetName: data.cssSpritesheetName,
              cssOpts: {
                functions: false
              },
              algorithm: "binary-tree",
              padding: 4
           }));
  // スプライトimgを書き出す場所
  sprite_data.img.pipe(gulp.dest(data.distImgDir));
  // スプライトcssを書き出す場所
  sprite_data.css.pipe(gulp.dest(data.distScssDir));
};

var Sprite = function() {
  DefaultRegistry.call(this);
  this.set('makeSpritePC', function(done) {
      gutil.log("-------------------- make sprite pc --------------------");
      make(pc);
      done();
  });

  this.set('makeSpriteSP', function(done) {
      gutil.log("-------------------- make sprite sp --------------------");
      make(sp);
      done();
  });
};

util.inherits(Sprite, DefaultRegistry);

module.exports = new Sprite();
