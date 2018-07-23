const { Jurisdiction } = require('../models')

exports.list = () => Jurisdiction
  .find()
  .limit(1000)
  .sort('name')
  .exec()

exports.findById = (id) => Jurisdiction.findById(id).exec()

exports.create = (attrs) => Jurisdiction.create(attrs)

exports.update = async (id, attrs = {}) => {
  const doc = await exports.findById(id)
  doc.set(attrs)
  return doc.save()
}
