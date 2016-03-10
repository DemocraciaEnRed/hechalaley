var gulp = require('gulp');
var pleeease = require('gulp-pleeease');
var settings = require('./settings');
var log = require('./log')('css');

var entries = [
  ['./lib/site/index.styl', 'site.css'],
  ['./lib/admin/index.styl', 'admin.css']
];

module.exports = {
  build: function () {
    var files = entries.map(function (file) {
      log.info(`${file[0]} => ${file[1]}`);

      return gulp.src(file[0])
        .pipe(pleeease({
          out: file[1],
          stylus: {
            'include css': true
          },
          mqpacker: true,
          minifier: settings.minify,
          sourcemaps: settings.sourcemaps
        }))
        .pipe(gulp.dest(settings.build));
    });

    return Promise.all(files);
  },

  watch: function () {
    return gulp.watch(['lib/**/*.styl'], ['css:build']);
  }
};
