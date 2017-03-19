const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  lastname: String,
  bio: String,
  pictureURL: String,
  appoinment: String,
  party: String,
  social: Schema.Types.Mixed,
  jurisdiction: { type: Schema.Types.ObjectId, ref: 'Jurisdiction' }
})

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
  return this.name + ' ' + this.lastname
})

module.exports = mongoose.model('Politician', schema)
