import test from 'ava'
import { diffs } from '../../../api/text'

test('#diffs with a sentence adding a word', (t) => {
  const from = 'Some markdown sentence.'
  const to = 'Some markdown sentence and a word.'
  const expected = 'Some markdown sentence <ins>and a word</ins>.'

  return diffs(from, to).then((result) => t.is(result, expected))
})

test('#diffs adding a title', (t) => {
  const from = ''
  const to = '# New title'
  const expected = '# <ins>New title</ins>'

  return diffs(from, to).then((result) => t.is(result, expected))
})

test('#diffs with a title removing a word', (t) => {
  const from = '# My content title\nSome markdown paragraph.'
  const to = '# My content\nSome markdown paragraph.'
  const expected = '# My content <del>title</del>\nSome markdown paragraph.'

  return diffs(from, to).then((result) => t.is(result, expected))
})

test('#diffs removing title after title', (t) => {
  const from = '# First title with words\n## Second title with more words\n### Third Title'
  const to = '# First title with words\n### Third Title'
  const expected = '# First title with words\n## <del>Second title with more words</del>\n### Third Title'

  return diffs(from, to).then((result) => t.is(result, expected))
})
