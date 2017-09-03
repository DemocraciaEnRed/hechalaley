const { Politician } = require('../models')

exports.list = function list () {
  return Politician
    .find()
    .limit(1000)
    .sort('name')
    .exec()
}

exports.findByIds = function findByIds (ids) {
  return Politician
    .find({ _id: { $in: ids } })
    .limit(1000)
    .exec()
}

exports.findById = function findById (id, opts) {
  opts = opts || { where: {}, populate: {} }
  const query = Politician.findById(id)

  if (opts.populate.jurisdiction) query.populate('jurisdiction')
  if (opts.where) query.where(opts.where)

  return query.exec()
}

exports.create = function create (attrs) {
  return Politician.create(attrs)
}

exports.update = function update (id, attrs) {
  return Politician.findById(id).exec()
    .then((doc) => {
      doc.set(attrs)
      return doc.save()
    })
    .catch((err) => { throw err })
}
