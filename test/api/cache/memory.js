const test = require('blue-tape')
const MemoryCache = require('../../../api/cache/memory')

test('MemoryCache: adding an item', async (t) => {
  const cache = new MemoryCache()
  const val = 123123

  await cache.set('one:two', val)

  t.ok(await cache.has('one:two'))
  t.equal(await cache.get('one:two'), val)
})

test('MemoryCache: adding an item with tags', async (t) => {
  const cache = new MemoryCache()

  await cache.set('one:two', 123123)

  t.ok(await cache.has('one:two'))
})

test('MemoryCache: deleting an item', async (t) => {
  const cache = new MemoryCache()

  await cache.set('one:two', 123123)
  await cache.del('one:two')

  t.notOk(await cache.has('one:two'))
})

test('MemoryCache: deleting multiple items by tag', async (t) => {
  const cache = new MemoryCache()

  await cache.set('one:two', 121212)
  await cache.set('two:one', 121212)
  await cache.set('one:three', 13131313)

  await cache.delByTag('two')

  t.notOk(await cache.has('one:two'))
  t.notOk(await cache.has('one:two'))
  t.ok(await cache.has('one:three'))
})
