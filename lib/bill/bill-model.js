var mongoose = require('mongoose');

var billSchema = {
  title: String,
  subTitle: String,
  summary: String,
  author: String,
  contents: String
};

module.exports = mongoose.model('Bill', billSchema);
