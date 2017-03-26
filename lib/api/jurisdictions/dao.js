const Jurisdiction = require('../models/jurisdiction')

exports.list = function list () {
  return Jurisdiction
    .find()
    .limit(1000)
    .sort('name')
    .exec()
}

exports.findById = function findById (id) {
  return Jurisdiction.findById(id).exec()
}

exports.create = function create (attrs) {
  return Jurisdiction.create(attrs)
}

exports.update = function update (id, attrs) {
  return Jurisdiction.findById(id).exec()
    .then((jurisdiction) => {
      jurisdiction.set(attrs)
      return jurisdiction.save()
    })
    .catch((err) => { throw err })
}
