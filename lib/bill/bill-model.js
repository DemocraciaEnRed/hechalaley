var mongoose = require('mongoose');

var billSchema = {
  title: String,
  subTitle: String,
  summary: String,
  author: String,
  contents: String,
  stages: [{
    stageID: String,
    contents: String,
    stageDate: String,
    stageAuthor: String
  }]
};

module.exports = mongoose.model('Bill', billSchema);

