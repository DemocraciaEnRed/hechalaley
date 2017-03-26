const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const Schema = mongoose.Schema

const schema = new Schema({
  firstname: { type: String, trim: true, maxlength: 127 },
  lastname: { type: String, trim: true, maxlength: 127 },
  bio: { type: String, trim: true, maxlength: 511 },
  pictureUrl: { type: String, trim: true, maxlength: 511 },
  appoinment: { type: String, trim: true, maxlength: 127 },
  party: { type: String, trim: true, maxlength: 127 },
  jurisdiction: { type: Schema.Types.ObjectId, ref: 'Jurisdiction' },
  social: Schema.Types.Mixed
}, {
  versionKey: false
})

schema.plugin(timestamps)

schema.options.toJSON =
schema.options.toObject = {
  getters: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    return ret
  }
}

schema.virtual('id').get(() => this._id)

schema.virtual('fullname').get(function () {
  const fullname = []
  if (this.firstname) fullname.push(this.firstname)
  if (this.lastname) fullname.push(this.lastname)
  return fullname.join(' ')
})

module.exports = schema
