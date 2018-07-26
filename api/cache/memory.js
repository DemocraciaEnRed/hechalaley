module.exports = class MemoryCache {
  constructor () {
    this.values = new Map()
    this.keyTags = new Map()
    this.tagKeys = new Map()
  }

  async get (key) {
    return this.values.get(key)
  }

  async has (key) {
    return this.values.has(key)
  }

  async set (key, value, tags = []) {
    if (!Array.isArray(tags)) {
      throw new Error('Tags param should be an array')
    }

    if (this.values.has(key)) await this.del(key)

    this.values.set(key, value)
    this.keyTags.set(key, tags)

    tags.forEach((tag) => {
      const keys = this.tagKeys.get(tag)
      const newKeys = keys ? [...keys, key] : [key]
      this.tagKeys.set(tag, newKeys)
    })
  }

  async del (key) {
    if (!this.values.has(key)) return

    const tags = this.keyTags.get(key)

    this.values.delete(key)
    this.keyTags.delete(key)

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
}
