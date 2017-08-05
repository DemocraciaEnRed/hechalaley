const { Schema } = require('mongoose')

const schema = new Schema({
  name: { type: String, trim: true, maxlength: 127 }
}, {
  timestamps: true
})

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

module.exports = schema
