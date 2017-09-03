const { User } = require('../models')

exports.list = function list () {
  return User
    .find()
    .where({ trashed: false })
    .limit(1000)
    .sort('email')
    .exec()
}

exports.findByEmail = function findByEmail (email) {
  return User.findOne({ email }).exec()
}

exports.findById = function findById (id) {
  return User.findById(id).exec()
}

exports.create = function create (attrs) {
  return User.create(attrs)
}

exports.update = function update (id, attrs) {
  return User.findById(id).exec()
    .then((doc) => {
      doc.set(attrs)
      return doc.save()
    })
    .catch((err) => { throw err })
}

exports.trash = function trash (id) {
  return exports.findById(id).then((doc) => {
    return doc.trash()
  }).catch((err) => { throw err })
}
