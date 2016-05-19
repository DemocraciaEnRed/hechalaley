var mongoose = require('mongoose')
var Schema = mongoose.Schema

var billSchema = {
  title: String,
  summary: String,
  published: Boolean,
  author: { type: Schema.Types.ObjectId, ref: 'Politician', required: true },
  coSigners: [{ type: Schema.Types.ObjectId, ref: 'Politician' }]
}

module.exports = mongoose.model('Bill', billSchema)
