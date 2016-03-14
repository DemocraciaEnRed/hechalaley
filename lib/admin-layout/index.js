var path = require('path')
var jade = require('jade')

var template = jade.compileFile(path.join(__dirname, 'index.jade'))
var html = template({})

module.exports = function renderLayout (req, res, next) {
  res.set('Content-Type', 'text/html')
  res.send(new Buffer(html))
}
