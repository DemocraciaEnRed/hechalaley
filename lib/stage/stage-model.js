var mongoose = require('mongoose')
var Schema = mongoose.Schema

var stageSchema = {
  title: String,
  summary: String,
  published: {type: Boolean, default: true},
  identification: String,
  stageDate: Date,
  billID: { type: Schema.Types.ObjectId, ref: 'Bill' },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  contents: String,
  stageID: String,
  contentsDate: String,
  previousStageID: String
}

module.exports = mongoose.model('Stage', stageSchema)
