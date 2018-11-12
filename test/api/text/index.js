const test = require('blue-tape')
const { diffs } = require('../../../api/text')

const tests = [
  {
    from: 'Some markdown sentence.',
    to: 'Some markdown sentence and a word.',
    expected: 'Some markdown sentence <ins>and a word</ins>.'
  },
  {
    from: '',
    to: '# New title',
    expected: '# <ins>New title</ins>'
  },
  {
    from: '# New title',
    to: '# New title 2',
    expected: '# New title <ins>2</ins>'
  },
  {
    from: '# My content title\nSome markdown paragraph.',
    to: '# My content\nSome markdown paragraph.',
    expected: '# My content <del>title</del>\nSome markdown paragraph.'
  },
  {
    from: '# First title with words\n## Second title with more words\n### Third Title',
    to: '# First title with words\n### Third Title',
    expected: '# First title with words\n## <del>Second title with more words</del>\n### Third Title'
  },
  {
    from: '',
    to: '* Bullet Point',
    expected: '* <ins>Bullet Point</ins>'
  },
  {
    from: '* Bullet Point',
    to: '* Bullet Point 2',
    expected: '- <del>Bullet Point</del>\n- <ins>Bullet Point 2</ins>'
  },
  {
    modifier: 'only',
    from: '1. First',
    to: '1. First Edit',
    expected: '1. <del>First</del>\n1. <ins>First Edit</ins>'
  }
]

tests.forEach(({ from, to, expected, modifier }, index) => {
  const createTest = modifier ? test[modifier] : test

  createTest(`#diffs assertion nº${index + 1}`, async (t) => {
    const result = await diffs(from, to)
    t.equal(result, expected)
  })
})
