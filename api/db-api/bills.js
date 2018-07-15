const { Bill } = require('../models')

const populate = {}

populate.stages = {
  path: 'stages',
  select: '-text',
  match: { trashed: false, published: true },
  options: { sort: { stageDate: -1 } }
}

exports.list = function list (query = {}) {
  return Bill
    .find(query)
    .where({ trashed: false })
    .populate(populate.stages)
    .exec()
}

exports.findById = function findById (id, options) {
  const opts = options || { where: {}, populate: {} }
  const query = Bill.findById(id)

  if (opts.populate.coSigners) query.populate('coSigners')
  if (opts.where) query.where(opts.where)

  return query
    .where({ trashed: false })
    .populate(populate.stages)
    .exec()
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
  return exports.findById(id).then((doc) => doc.trash()).catch((err) => { throw err })
}
