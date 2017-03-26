const Bill = require('../models').Bill

exports.list = function list (query) {
  return Bill
    .find(query)
    .select('-stages')
    .exec()
}

exports.findById = function findById (id, opts) {
  opts = opts || { where: {}, populate: {} }
  const query = Bill.findById(id)

  if (opts.populate.coSigners) query.populate('coSigners')
  if (opts.where) query.where(opts.where)

  return query.exec()
}

exports.create = function create (attrs) {
  return Bill.create(attrs)
}

exports.update = function update (id, attrs) {
  return Bill.findById(id).exec()
    .then((doc) => {
      doc.set(attrs)
      return doc.save()
    })
    .catch((err) => { throw err })
}
