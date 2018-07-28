module.exports = class MemoryCache {
  constructor (options = {}) {
    const {
      delimiter = ':'
    } = options

    this.delimiter = delimiter

    this.clear()
  }

  async clear () {
    this.values = new Map()
    this.tagKeys = new Map()
  }

  async get (key) {
    return this.values.get(key)
  }

  async has (key) {
    return this.values.has(key)
  }

  async set (key, value) {
    if (await this.has(key)) await this.del(key)

    const tags = key.split(this.delimiter)

    this.values.set(key, value)

    tags.forEach((tag) => {
      const keys = this.tagKeys.get(tag)
      const newKeys = keys ? [...keys, key] : [key]
      this.tagKeys.set(tag, newKeys)
    })
  }

  async del (key) {
    if (!(await this.has(key))) return

    const tags = key.split(this.delimiter)

    this.values.delete(key)

    tags.forEach((tag) => {
      const tagKeys = this.tagKeys.get(tag)
      const filteredKeys = tagKeys.filter((k) => k !== key)

      if (filteredKeys.length > 0) {
        this.tagKeys.set(tag, filteredKeys)
      } else {
        this.tagKeys.delete(tag)
      }
    })
  }

  async delByTag (tag) {
    if (!this.tagKeys.has(tag)) return

    const keys = this.tagKeys.get(tag)

    return Promise.all(keys.map((key) => this.del(key)))
  }

  wrap (getCacheKey, fn) {
    return async (...args) => {
      const key = getCacheKey(...args)

      if (await this.has(key)) return this.get(key)

      const value = await fn(...args)

      await this.set(key, value)

      return value
    }
  }
}
