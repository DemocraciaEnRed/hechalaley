var gulp = require('gulp')
var browserify = require('browserify')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var log = require('./log')('js')
var settings = require('./settings')

var entries = [
  ['./lib/site/site.js', 'site.js'],
  ['./lib/admin/admin.js', 'admin.js']
]

module.exports = {
  build: function () {
    var bs = entries.map(function (file) {
      var opts = {
        entries: file[0],
        debug: settings.verbose
      }

      var b = bundle(opts)
        .bundle()
        .on('error', log.error.bind(log))
        .pipe(source(file[1]))

      return b.pipe(gulp.dest(settings.build))
    })

    return Promise.all(bs)
  },

  watch: function () {
    var bs = entries.map(function (file) {
      var opts = {
        entries: file[0],
        debug: settings.verbose,
        cache: {},
        packageCache: {},
        plugin: [watchify]
      }

      var b = bundle(opts)

      b
        .on('error', log.error.bind(log))
        .on('log', log.info.bind(log))
        .on('bytes', log.debug.bind(log))
        .on('update', update)

      update()

      function update () {
        b.bundle().pipe(source(file[1])).pipe(gulp.dest(settings.build))
      }

      return b
    })

    return Promise.all(bs)
  }
}

function bundle (opts) {
  var b = browserify(opts)
    .transform('jadeify')
    .transform('babelify', {compact: false})

  if (settings.minify) b = b.transform({global: true}, 'uglifyify')
  return b
}
