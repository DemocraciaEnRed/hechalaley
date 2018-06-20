const diff = require('rich-text-diff')
const marky = require('marky-markdown')
const myers = require('myers-diff').default
const stringSimilarity = require('string-similarity')

const text = {}

function wordDiff (a, b) {
  return diff(a, b)
    .replace(/<(ins|del)>(\s+)/g, '$2<$1>')
    .replace(/<(ins|del)>(#+\s*)/g, '$2<$1>')
}

function wrapTag (tag, str) {
  return `<${tag}>${str}</${tag}>`
    .replace(/<(ins|del)>(#+\s*)/g, '$2<$1>')
}

const wrapInsTag = wrapTag.bind(null, 'ins')
const wrapDelTag = wrapTag.bind(null, 'del')

function areSimilar (a, b) {
  return stringSimilarity.compareTwoStrings(a, b) >= 0.5
}

text.markdownToHtml = function markdownToHtml (str) {
  return Promise.resolve(marky(str, { sanitize: false }))
}

text.diffs = function diffs (from, to) {
  const diffs = myers.diff(from, to)
  const lines = to.split('\n')

  diffs.forEach((item) => {
    for (let i = item.lhs.at; i < item.lhs.at + item.lhs.del; ++i) {
      const value = item.lhs.ctx.getLine(i)

      if (!value) continue

      if (lines[i]) {
        if (areSimilar(value, lines[i])) {
          lines[i] = wordDiff(value, lines[i])
        } else {
          lines[i] = `${wrapDelTag(value)}\n${lines[i]}`
        }
      } else {
        lines[i] = wrapDelTag(value)
      }
    }

    for (let i = item.rhs.at; i < item.rhs.at + item.rhs.add; ++i) {
      const value = item.rhs.ctx.getLine(i)

      if (value && lines[i] === value) {
        lines[i] = wrapInsTag(value)
      }
    }
  })

  return Promise.resolve(lines.join('\n'))
}

text.diffsInHtml = function diffsInHtml (from, to) {
  return text.diffs(from, to).then(text.markdownToHtml)
}

module.exports = text
