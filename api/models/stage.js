const { Schema } = require('mongoose')
const base = require('./plugins/base')
const trashable = require('./plugins/trashable')

const schema = new Schema({
  bill: { type: Schema.Types.ObjectId, ref: 'Bill', required: true },
  title: { type: String, trim: true, maxlength: 127, required: true },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  identification: { type: String, trim: true, maxlength: 63 },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  stageDate: Date,
  text: String
}, {
  timestamps: true
})

schema.plugin(base)
schema.plugin(trashable)

schema.pre('save', function (next) {
  if (this.text) {
    this.text = this.text.replace(/\n+/g, '\n\n')
  }

  next()
})

module.exports = schema
