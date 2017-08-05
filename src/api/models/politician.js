const { Schema } = require('mongoose')
const base = require('./plugins/base')

const schema = new Schema({
  firstName: { type: String, trim: true, maxlength: 127 },
  lastName: { type: String, trim: true, maxlength: 127 },
  bio: { type: String, trim: true, maxlength: 511 },
  pictureUrl: { type: String, trim: true, maxlength: 511 },
  appoinment: { type: String, trim: true, maxlength: 127 },
  party: { type: String, trim: true, maxlength: 127 },
  jurisdiction: { type: Schema.Types.ObjectId, ref: 'Jurisdiction' },
  social: Schema.Types.Mixed
}, {
  timestamps: true
})

schema.plugin(base)

schema.virtual('fullname').get(function () {
  const fullname = []
  if (this.firstName) fullname.push(this.firstName)
  if (this.lastName) fullname.push(this.lastName)
  return fullname.join(' ')
})

module.exports = schema
