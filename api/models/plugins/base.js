/* eslint-disable no-param-reassign */

module.exports = function base (schema) {
  const opts = {
    getters: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id
      return ret
    }
  }

  schema.options.toJSON = opts
  schema.options.toObject = opts

  schema.virtual('id').get(function getId () { return this._id })
}
