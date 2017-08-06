const Bill = require('../models').Bill

exports.list = function list (query) {
  return Bill
    .find(query)
    .where({ trashedAt: null })
    .populate('stages', 'title summary identification')
    .exec()
}

exports.findById = function findById (id, opts) {
  opts = opts || { where: {}, populate: {} }
  const query = Bill.findById(id)

  if (opts.populate.coSigners) query.populate('coSigners')
  if (opts.where) query.where(opts.where)

  return query.where({ trashedAt: null }).exec()
}

exports.create = function create (attrs) {
  return Bill.create(attrs)
}

exports.update = function update (id, attrs) {
  return exports.findById(id)
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
