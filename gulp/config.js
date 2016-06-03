'use strict';

var webpack = require('webpack');

var rootDir = './',
  _developDir = './_develop/',
  _distDir = './public/',
  _distSrcDir = './public/';

var dev = './_develop/',
    dist = './public/',
    deploy = rootDir + 'dist/',
    gulpDir = './gulp/';

module.exports = {
  autoprefixer: [ 'last 2 version', 'ie 9', 'ie 10', 'ie 11', 'Android 4', 'iOS 7', 'iOS 8' ],

  path: {
    dev: dev,
    deploy: deploy,
    tasks: gulpDir + '/tasks/',

    base: {
      distDir: _distDir,
      browseRootFile: 'index.html'
    },

    jsonDataDir: _developDir + 'src/',
    jsonFile: _developDir + 'src/config.json',

    // js
    devJsDir: dev + 'js/',

    // compass, css
    compassConfig: dev + 'config.rb',
    scssDir: dev + 'scss/',
    cssDir: dist + 'css/',
    cssFile: dist + 'css/**/*.css',

    // jade
    jadeEntry: dev + 'jade/**/!(_)*.jade',

    // for watch task
    scssFile: dev + 'scss/**/*.{sass,scss}',
    jadeFile: dev + 'jade/**/*.jade',
    jsFile: dev + 'js/**/*.{js,jsx}',

    // for sprite task
    sprite: {
      pc: {
        src: dev + 'images/sprite/pc/**/*.*',
        imgName: 'sprite-pc.png',
        imgPath: '../images/sprite/sprite-pc.png',
        cssName: '_sprite-pc.scss',
        cssFormat: 'scss',
        cssSpritesheetName: 'spritesheet-pc',
        cssVarMap: function(sprite) {
          sprite.name = 'sprite-pc-' + sprite.name;
        },
        distImgDir: dist + 'images/sprite/',
        distScssDir: dev + 'scss/module/'
      },
      sp: {
        src: dev + 'images/sprite/sp/**/*.*',
        imgName: 'sprite-sp.png',
        imgPath: '../images/sprite/sprite-sp.png',
        cssName: '_sprite-sp.scss',
        cssFormat: 'scss',
        cssSpritesheetName: 'spritesheet-sp',
        cssVarMap: function(sprite) {
          sprite.name = 'sprite-sp-' + sprite.name;
        },
        distImgDir: dist + 'images/sprite/',
        distScssDir: dev + 'scss/module/'
      }
    },

    dist: {
      root: dist,
      html: dist,
      css: dist + "css/",
      js: dist + "js/",
      img: dist + "images/"
    },

    entry: {
      js: 'main/Main.js' // for browserify
    },

    output: {
      js: 'app.js'
    }
  },

  // webpack
  webpack: {
    /*
    entry: dev + 'js/main/Main.js',
    output: {
      filename: 'app.js'
    },
    */

    entry: {
      app: ['babel-polyfill', dev + 'js/main/Main.js'], // generatorを使うときはpreprocessor的にpolyfilを読み込む
    },
    output: {
      filename: '[name].js',
      chunkFileName: '[id].js'
    },

    devtool: "#source-map",
    resolve: {
      extensions: [ '', '.js', 'jsx' ],
      moduleDirectories: [ 'node_modules', 'bower_components' ],
      alias: {
        bower: 'bower_components',
        velocity: __dirname + '/../bower_components/velocity/velocity.min.js'
        //sleep: __dirname + '/../_develop/js/util/sleep.js' // 自作ファイルをライブラリっぽく書くこともできる
      }
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      new webpack.optimize.DedupePlugin(), // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
      new webpack.optimize.AggressiveMergingPlugin(), //ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
      /*
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
      })
      */
    ],
    module: {
      // babel Loaderを指定してWebpackがBabelのコンパイルをできるように
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel",
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.jsx$/,
          loader: 'jsx-loader?harmony'
        }
      ]
    }
  }

};
