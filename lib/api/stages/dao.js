const Stage = require('../models').Stage

exports.list = function list (query) {
  return Stage
    .find(query)
    .select('-text')
    .exec()
}

exports.findById = function findById (id, opts) {
  opts = opts || { where: {}, populate: {} }
  const query = Stage.findById(id)

  if (opts.populate.authors) query.populate('authors')
  if (opts.where) query.where(opts.where)

  return query.exec()
}

exports.create = function create (attrs) {
  return Stage.create(attrs)
}

exports.update = function update (id, attrs) {
  return Stage.findById(id).exec()
    .then((doc) => {
      doc.set(attrs)
      return doc.save()
    })
    .catch((err) => { throw err })
}
