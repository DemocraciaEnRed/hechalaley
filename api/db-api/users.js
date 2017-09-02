const User = require('../models').User

exports.list = function list () {
  return User
    .find()
    .limit(1000)
    .sort('email')
    .exec()
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
