const { User } = require('../models')

let isEmptyCached = null
exports.isEmptyCached = async () => {
  if (isEmptyCached === false) return false
  isEmptyCached = await User.count({}) === 0
  return isEmptyCached
}

exports.list = () => User
  .find()
  .where({ trashed: false })
  .limit(1000)
  .sort('email')
  .exec()

exports.findByEmail = (email) => User.findOne({ email, trashed: false })

exports.findById = (id) => User.findById(id)

exports.create = (attrs) => User.create(attrs)

exports.update = async (id, attrs = {}) => {
  const doc = await exports.findById(id)
  doc.set(attrs)
  return doc.save()
}

exports.trash = async (id) => {
  const doc = await exports.findById(id)
  return doc.trash()
}
