const { Schema } = require('mongoose')
const base = require('./plugins/base')

const schema = new Schema({
  name: { type: String, trim: true, maxlength: 127 }
}, {
  timestamps: true
})

schema.plugin(base)

module.exports = schema
