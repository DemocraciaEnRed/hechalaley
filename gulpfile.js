var gulp = require('gulp');
var assets = require('./lib/build/assets');
var css = require('./lib/build/css');

gulp
  .task('assets:build', assets.build)
  .task('css:build', css.build)
  .task('build', ['assets:build', 'css:build'])
  .task('default', ['build']);
