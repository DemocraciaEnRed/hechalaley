const { diffLines } = require('diff')
const marked = require('marked')
const stringSimilarity = require('string-similarity')

const fixMdBlock = (str) =>
  str.replace(/<(ins|del)>((?:#+|\*|\+|[0-9]+\.|>)\s*)/g, '$2<$1>')

const wrapTag = (tag, str) => {
  if (!str) return str
  return fixMdBlock(`<${tag}>${str}</${tag}>`)
}

exports.areSimilar = (a, b) => stringSimilarity.compareTwoStrings(a, b) >= 0.5

exports.markdownToHtml = async (str = '') => marked(str)

exports.diffs = (from = '', to = '') => {
  const changes = diffLines(from, to, {
    ignoreWhitespace: true,
    newlineIsToken: false
  })

  const result = changes.map(({ added, removed, value }) => {
    if (added || removed) {
      const tag = added ? 'ins' : 'del'
      return value.split('\n').map((str) => wrapTag(tag, str)).join('\n')
    }

    return value
  })

  return Promise.resolve(result.join('\n'))
}

exports.diffsInHtml = (from, to) =>
  exports.diffs(from, to).then(exports.markdownToHtml)
