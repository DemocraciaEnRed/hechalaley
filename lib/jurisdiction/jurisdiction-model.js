const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: String
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

schema.virtual('id').get(() => this._id)

module.exports = mongoose.model('Jurisdiction', schema)
