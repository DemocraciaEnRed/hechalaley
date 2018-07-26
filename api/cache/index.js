/**
 * Simple key-value stored cache
 * For now, its only implemented on-memory, but we will do it using
 * MongoDB or Redis depending on the given config
 */

const MemoryCache = require('./memory')

module.exports = MemoryCache
