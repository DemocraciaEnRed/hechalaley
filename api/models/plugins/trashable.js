module.exports = function trashable (schema, options) {
  schema.add({
    trashedAt: Date,
    trashed: { type: Boolean, default: false, index: true }
  })

  schema.methods.trash = function () {
    this.trashedAt = new Date()
    this.trashed = true
    return this.save()
  }
}
