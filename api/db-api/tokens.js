const { Token } = require('../models')

exports.validated = function validated (id) {
  return Token.findById(id)
    .exec()
    .then((token) => {
      return !!token && token.validated
    })
}

exports.create = function create () {
  return Token.create({})
}

exports.validate = function validate (id) {
  return Token.findById(id)
    .exec()
    .then((doc) => {
      if (!doc) throw new Error('Token not found')

      doc.set('validated', true)

      return doc.isModified() ? doc.save() : doc
    })
}
