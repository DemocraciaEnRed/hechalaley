const diff = require('rich-text-diff')
const marked = require('marked')
const myers = require('myers-diff').default
const stringSimilarity = require('string-similarity')

const text = {}

const fixMdBlock = (str) =>
  str.replace(/<(ins|del)>((?:#+|\*|\+)\s*)/g, '$2<$1>')

const fixWhitespace = (str) =>
  str.replace(/<(ins|del)>(\s+)/g, '$2<$1>')

// 'rich-text-diff' only recognizes lists that use the '-' char
// not '*' or '+'
const fixBullets = (str) =>
  str.replace(/^(\s*)(?:\*|\+)(\s*)/g, '$1-$2')

// 'rich-text-diff' sometimes creates a LI items with number '0.'
// this fixes it to '1.'
const fixNumbers = (str) => str
// str.replace(/^(\s*)(?:0\.)(\s*)/g, (_, $1, $2) => `${$1}-${$2}`)

const wordDiff = (a, b) =>
  fixMdBlock(fixWhitespace(fixNumbers(diff(fixBullets(a), fixBullets(b)))))

const wrapTag = (tag, str) =>
  fixMdBlock(`<${tag}>${str}</${tag}>`)

const wrapInsTag = wrapTag.bind(null, 'ins')
const wrapDelTag = wrapTag.bind(null, 'del')

const areSimilar = (a, b) => stringSimilarity.compareTwoStrings(a, b) >= 0.5

text.markdownToHtml = async (str = '') => marked(str)

text.diffs = function diffs (from = '', to = '') {
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

text.diffsInHtml = (from, to) =>
  text.diffs(from, to).then(text.markdownToHtml)

module.exports = text
