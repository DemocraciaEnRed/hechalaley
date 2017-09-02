const { Schema } = require('mongoose')
const auth = require('./plugins/auth')
const base = require('./plugins/base')
const trashable = require('./plugins/trashable')

const schema = new Schema({}, {
  timestamps: true
})

schema.plugin(base)
schema.plugin(trashable)
schema.plugin(auth)

module.exports = schema
