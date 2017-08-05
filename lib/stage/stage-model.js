const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: String,
  summary: String,
  published: { type: Boolean, default: true },
  identification: String,
  stageDate: Date,
  billID: { type: Schema.Types.ObjectId, ref: 'Bill' },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  contents: String
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

module.exports = mongoose.model('Stage', schema)
