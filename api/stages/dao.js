const marky = require('marky-markdown')
const diff = require('rich-text-diff')
const Stage = require('../models').Stage

exports.list = function list (query = {}) {
  return Stage
    .find(query)
    .where({ trashedAt: null })
    .sort('-stageDate')
    .exec()
}

exports.findById = function findById (id, opts = { where: {}, populate: {} }) {
  const query = Stage.findById(id)

  if (opts.populate.authors) query.populate('authors')
  if (opts.where) query.where(opts.where)

  return query.where({ trashedAt: null }).exec()
}

exports.create = function create (attrs = {}) {
  return Stage.create(attrs)
}

exports.update = function update (id, attrs = {}) {
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

exports.getTextHtml = function getTextHtml (id, query = {}) {
  return Stage
    .findOne({ _id: id })
    .where(query)
    .where({ trashedAt: null })
    .select('text')
    .exec()
    .then(({ text } = {}) => {
      if (!text) throw new Error('Stage not found')
      return text
    })
    .then(markdownTohtml)
}

exports.getDiffHtml = function getDiffHtml (fromStage, toStage, query = {}) {
  return Stage
    .find(query)
    .where({ trashedAt: null })
    .where({ _id: { $in: [fromStage, toStage] } })
    .select('text')
    .exec()
    .then(([from, to]) => {
      if (!from || !to) throw new Error('Stages not found')
      return diff(to.text, from.text)
    })
    .then(markdownTohtml)
}

function markdownTohtml (text) {
  return marky(text, { sanitize: false })
}
