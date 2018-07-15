module.exports = function trashable (schema) {
  schema.add({
    trashedAt: Date,
    trashed: { type: Boolean, default: false, index: true }
  })

  // eslint-disable-next-line no-param-reassign
  schema.methods.trash = function trash () {
    this.trashedAt = new Date()
    this.trashed = true
    return this.save()
  }
}
