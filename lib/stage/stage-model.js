var mongoose = require('mongoose')
var Schema = mongoose.Schema

var stageSchema = {
  title: String,
  subTitle: String,
  billID: { type: Schema.Types.ObjectId, ref: 'Bill' },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Politician' }],
  contents: String,
  stageID: String,
  stageDate: String,
  previousStageID: String
}

module.exports = mongoose.model('Stage', stageSchema)
