const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const Schema = mongoose.Schema

const schema = new Schema({
  title: { type: String, trim: true, maxlength: 127 },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'Politician', required: true },
  coSigners: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  trashedAt: Date
}, {
  versionKey: false
})

schema.plugin(timestamps)

schema.options.toJSON =
schema.options.toObject = {
  getters: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    return ret
  }
}

schema.virtual('id').get(() => this._id)

schema.methods.trash = function () {
  this.trashedAt = new Date()
  return this.save()
}

module.exports = schema
