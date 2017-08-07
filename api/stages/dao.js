const Stage = require('../models').Stage

exports.list = function list (query) {
  return Stage
    .find(query)
    .where({ trashedAt: null })
    .sort('-stageDate')
    .exec()
}

exports.findById = function findById (id, opts) {
  opts = opts || { where: {}, populate: {} }
  const query = Stage.findById(id)

  if (opts.populate.authors) query.populate('authors')
  if (opts.where) query.where(opts.where)

  return query.where({ trashedAt: null }).exec()
}

exports.create = function create (attrs) {
  return Stage.create(attrs)
}

exports.update = function update (id, attrs) {
  return exports.findById(id).then((doc) => {
    doc.set(attrs)
    return doc.save()
  }).catch((err) => { throw err })
}

exports.trash = function trash (id) {
  return exports.findById(id).then((doc) => {
    return doc.trash()
  }).catch((err) => { throw err })
}
