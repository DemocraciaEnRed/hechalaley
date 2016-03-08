var gulp = require('gulp');
var assets = require('./assets');
var css = require('./css');
var js = require('./js');

gulp
  .task('assets:build', assets.build)

  .task('css:build', css.build)
  .task('css:watch', css.watch)

  .task('js:build', js.build)
  .task('js:watch', js.watch)

  .task('build', ['assets:build', 'css:build', 'js:build'])
  .task('watch', ['css:watch', 'js:watch'])
  .task('default', ['build']);
