var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var jadeify = require('jadeify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var sourcemaps = require('gulp-sourcemaps');
var log = require('./log')('js');
var settings = require('./settings');

var entries = [
  ['./lib/site/site.js', 'site.js'],
  ['./lib/admin/admin.js', 'admin.js']
];

module.exports = {
  build: function () {
    return bundles(bundle);
  },

  watch: function () {
    return bundles(function (opts) {
      opts = assign({}, watchify.args, opts);
      return watchify(bundle(opts));
    });
  }
};

function bundle (opts) {
  return browserify(opts).transform(jadeify);
}

function bundles (bundler) {
  var bs = entries.map(function (file) {
    var opts = {
      entries: file[0],
      transform: ['babelify'],
      debug: settings.verbose
    };

    var b = bundler(opts)
      .bundle()
      .on('error', log.error.bind(log))
      .pipe(source(file[1]));

    if (settings.sourcemaps) {
      b = b
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'));
    }

    return b.pipe(gulp.dest(settings.build));
  });

  return Promise.all(bs);
}
