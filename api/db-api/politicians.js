const { Politician } = require('../models')

exports.list = () => Politician
  .find()
  .limit(1000)
  .sort('name')
  .exec()

exports.findByIds = (ids) => Politician
  .find({ _id: { $in: ids } })
  .limit(1000)
  .exec()

exports.findById = (id, options) => {
  const opts = options || { where: {}, populate: {} }
  const query = Politician.findById(id)

  if (opts.populate.jurisdiction) query.populate('jurisdiction')
  if (opts.where) query.where(opts.where)

  return query.exec()
}

exports.create = (attrs) => Politician.create(attrs)

exports.update = async (id, attrs = {}) => {
  const doc = await exports.findById(id)
  doc.set(attrs)
  return doc.save()
}
