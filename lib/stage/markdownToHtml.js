var marked = require('marked')

module.exports = function markdownToHtml (str, cb) {
  return marked(str, {
    smartypants: true
  }, cb)
}
