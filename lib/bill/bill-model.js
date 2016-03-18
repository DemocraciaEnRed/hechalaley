var mongoose = require('mongoose')
var Schema = mongoose.Schema

var billSchema = {
  title: String,
  subTitle: String,
  summary: String,
  author: { type: Schema.Types.ObjectId, ref: 'Politician' },
  coSigners: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  contents: String
}

module.exports = mongoose.model('Bill', billSchema)
