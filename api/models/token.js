const { Schema } = require('mongoose')

const schema = new Schema({
  validated: { type: Boolean, default: false },
  createdAt: { type: Date, index: { expires: '15m' } }
})

module.exports = schema
