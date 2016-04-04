var mongoose = require('mongoose')
var Schema = mongoose.Schema

var options = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
}

var jurisdictionSchema = new Schema({
  name: String
}, options)

module.exports = mongoose.model('Jurisdiction', jurisdictionSchema)
