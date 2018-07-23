const { Bill } = require('../models')

const populate = {}

populate.stages = {
  path: 'stages',
  select: '-text',
  match: { trashed: false, published: true },
  options: { sort: { stageDate: -1 } }
}

exports.list = (query = {}) => Bill
  .find(query)
  .where({ trashed: false })
  .populate(populate.stages)
  .exec()

exports.findById = (id, options) => {
  const opts = options || { where: {}, populate: {} }
  const query = Bill.findById(id)

  if (opts.populate.coSigners) query.populate('coSigners')
  if (opts.where) query.where(opts.where)

  return query
    .where({ trashed: false })
    .populate(populate.stages)
    .exec()
}

exports.create = (attrs) => Bill.create(attrs)

exports.update = async (id, attrs = {}) => {
  const doc = await exports.findById(id)
  doc.set(attrs)
  return doc.save()
}

exports.trash = async (id) => {
  const doc = await exports.findById(id)
  return doc.trash()
}
