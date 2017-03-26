const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String, trim: true, maxlength: 127 }
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

module.exports = schema
