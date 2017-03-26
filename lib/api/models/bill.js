const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stage = new Schema({
  title: { type: String, trim: true, maxlength: 127 },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  identification: { type: String, trim: true, maxlength: 63 },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  stageDate: Date,
  text: String
})

const schema = new Schema({
  title: { type: String, trim: true, maxlength: 127 },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'Politician', required: true },
  coSigners: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  stages: [stage]
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

module.exports = schema
