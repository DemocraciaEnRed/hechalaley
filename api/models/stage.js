const { Schema } = require('mongoose')
const base = require('./plugins/base')
const trashable = require('./plugins/trashable')

const { ObjectId } = Schema.Types

const schema = new Schema({
  bill: { type: ObjectId, ref: 'Bill', required: true },
  title: { type: String, trim: true, maxlength: 127, required: true },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  identification: { type: String, trim: true, maxlength: 63 },
  currentCondition: { type: String, trim: true, maxlength: 255 },
  nextCondition: { type: String, trim: true, maxlength: 255 },
  authors: [{ type: ObjectId, ref: 'Politician' }],
  stageDate: Date,
  text: { type: String, default: '' }
}, {
  timestamps: true
})

schema.index({ published: 1, trashed: 1 })
schema.index({ trashed: 1, stageDate: -1 })
schema.index({ published: 1, trashed: 1, stageDate: -1 })
schema.index({ bill: 1, trashed: 1, stageDate: -1 })
schema.index({ bill: 1, published: 1, trashed: 1, stageDate: -1 })

schema.plugin(base)
schema.plugin(trashable)

schema.pre('save', function preSave (next) {
  // Normalize whitespace
  if (this.text) {
    this.text = this.text.replace(/\n{2,}/g, '\n\n')
  }

  next()
})

module.exports = schema
