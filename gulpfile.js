var gulp = require('gulp');
var assets = require('./lib/build/assets');
var css = require('./lib/build/css');
var js = require('./lib/build/js');

gulp
  .task('assets:build', assets.build)
  .task('css:build', css.build)
  .task('js:build', js.build)
  .task('build', ['assets:build', 'css:build', 'js:build'])
  .task('default', ['build']);
