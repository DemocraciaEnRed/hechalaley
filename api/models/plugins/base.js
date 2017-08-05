module.exports = function base (schema, options) {
  schema.options.toJSON =
  schema.options.toObject = {
    getters: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id
      return ret
    }
  }

  schema.virtual('id').get(function () { return this._id })
}
