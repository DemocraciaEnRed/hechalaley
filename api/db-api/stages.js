const text = require('../text')
const { Stage } = require('../models')

exports.list = (query = {}) => Stage
  .find(query)
  .where({ trashed: false })
  .sort('-stageDate')
  .exec()

exports.findById = (id, opts = { where: {}, populate: {} }) => {
  const query = Stage.findById(id)

  if (opts.populate.authors) query.populate('authors')
  if (opts.where) query.where(opts.where)

  return query.where({ trashed: false }).exec()
}

exports.findByBill = (billId) =>
  Stage.where({ bill: billId, trashed: false }).exec()

exports.create = (attrs = {}) => Stage.create(attrs)

exports.update = async (id, attrs = {}) => {
  const doc = await exports.findById(id)
  doc.set(attrs)
  return doc.save()
}

exports.trash = async (id) => {
  const doc = await exports.findById(id)
  return doc.trash()
}

exports.getTextHtml = (id, query = {}) => Stage
  .findOne({ _id: id })
  .where(query)
  .where({ trashed: false })
  .select('text')
  .exec()
  .then((stage) => {
    if (!stage) throw new Error('Stage not found')
    return stage.text
  })
  .then(text.markdownToHtml)

const getById = (docs, id) => docs.find((doc) => doc._id.toString() === id)

exports.getDiffHtml = (fromStage, toStage, query = {}) => Stage
  .find(query)
  .where({ trashed: false })
  .where({ _id: { $in: [fromStage, toStage] } })
  .select('text')
  .exec()
  .then((stages) => {
    if (stages.length !== 2) throw new Error('Stages not found')

    const from = getById(stages, fromStage)
    const to = getById(stages, toStage)

    return text.diffsInHtml(to.text, from.text)
  })
