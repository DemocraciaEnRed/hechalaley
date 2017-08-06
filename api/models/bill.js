const { Schema } = require('mongoose')
const base = require('./plugins/base')
const trashable = require('./plugins/trashable')

const schema = new Schema({
  title: { type: String, trim: true, maxlength: 127 },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: 'Politician', required: true },
  coSigners: [{ type: Schema.Types.ObjectId, ref: 'Politician' }]
}, {
  timestamps: true
})

schema.plugin(base)
schema.plugin(trashable)

schema.virtual('url').get(function () {
  return `/bills/${this._id}`
})

schema.virtual('stages', {
  ref: 'Stage',
  localField: '_id',
  foreignField: 'bill',
  justOne: false
})

schema.virtual('currentStage').get(function () {
  if (!this.stages) return undefined
  if (this.stages.length === 0) return {}
  return this.stages[this.stages.length - 1]
})

module.exports = schema
