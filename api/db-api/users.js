const { User } = require('../models')

let isEmptyCached = null
exports.isEmptyCached = async () => {
  if (isEmptyCached === false) return false
  isEmptyCached = await User.count({}) === 0
  return isEmptyCached
}

exports.list = function list () {
  return User
    .find()
    .where({ trashed: false })
    .limit(1000)
    .sort('email')
    .exec()
}

exports.findByEmail = function findByEmail (email) {
  return User.findOne({ email, trashed: false }).exec()
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
  return exports.findById(id)
    .then((doc) => doc.trash())
    .catch((err) => { throw err })
}
