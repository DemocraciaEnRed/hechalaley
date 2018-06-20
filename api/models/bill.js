const { Schema } = require('mongoose')
const base = require('./plugins/base')
const trashable = require('./plugins/trashable')

const { ObjectId } = Schema.Types

const schema = new Schema({
  title: { type: String, trim: true, maxlength: 127 },
  summary: { type: String, trim: true, maxlength: 255 },
  published: { type: Boolean, default: false },
  author: { type: ObjectId, ref: 'Politician', required: true },
  coSigners: [{ type: ObjectId, ref: 'Politician' }]
}, {
  timestamps: true
})

schema.index({ published: -1, trashed: -1 })

schema.plugin(base)
schema.plugin(trashable)

schema.virtual('url').get(function getUrl () {
  return `/bills/${this._id}`
})

schema.virtual('stages', {
  ref: 'Stage',
  localField: '_id',
  foreignField: 'bill',
  justOne: false
})

module.exports = schema
