var gulp = require('gulp');
var settings = require('./settings');
var copy = require('./copy-assets');

module.exports = {
  build: function () {
    return gulp.src('./lib/**/assets/**/*')
      .pipe(copy(settings.build, {verbose: settings.verbose}));
  }
};
