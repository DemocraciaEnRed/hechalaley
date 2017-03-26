const Jurisdiction = require('../models').Jurisdiction

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
    .then((doc) => {
      doc.set(attrs)
      return doc.save()
    })
    .catch((err) => { throw err })
}
