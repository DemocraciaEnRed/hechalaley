var argv = require('yargs').argv
var production = process.env.NODE_ENV === 'production' || argv.production

var settings = {}
settings.build = 'build'
settings.verbose = !!argv.verbose
settings.sourcemaps = !!argv.sourcemaps
settings.minify = !!argv.minify
settings.production = production
settings.livereload = !production && argv.livereload

module.exports = settings
