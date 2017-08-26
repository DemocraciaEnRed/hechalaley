const diff = require('rich-text-diff')
const marky = require('marky-markdown')

const text = module.exports = {}

text.markdownToHtml = function markdownToHtml (str) {
  console.log(str)
  return Promise.resolve(marky(str, { sanitize: false }))
}

text.diffs = function diffs (from, to) {
  return Promise.resolve(diff(from, to))
}

text.diffsInHtml = function diffsInHtml (from, to) {
  return text.diffs(from, to).then(text.markdownToHtml)
}
