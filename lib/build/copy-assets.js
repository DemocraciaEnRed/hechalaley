var path = require('path')
var through = require('through2-concurrent')
var fs = require('fs')
var mkdirp = require('mkdirp')
var log = require('./log')('copy')

module.exports = function (dir, opts) {
  opts = opts || {}

  function destination (sourcePath, base) {
    var fullPath = sourcePath
    var relativePath = fullPath.replace(base, '')
    var relativeDest = relativePath.replace('/assets', '')
    return path.join(dir, relativeDest)
  }

  return through.obj(function (file, enc, cb) {
    var destPath = destination(file.history[0], file.base)
    mkdirp(path.dirname(destPath), function () {
      log.debug(destPath)
      fs.writeFile(destPath, file.contents, cb)
    })
  })
}
