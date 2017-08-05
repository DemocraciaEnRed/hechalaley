module.exports = function trashable (schema, options) {
  schema.add({
    trashedAt: Date
  })

  schema.methods.trash = function () {
    this.trashedAt = new Date()
    return this.save()
  }
}
