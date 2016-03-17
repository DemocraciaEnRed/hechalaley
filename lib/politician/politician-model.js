var mongoose = require('mongoose')

var politicianSchema = {
  name: String,
  lastname: String
}

module.exports = mongoose.model('Politician', politicianSchema)
