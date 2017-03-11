var mongoose = require('mongoose')
var Jurisdiction = require('lib/jurisdiction/jurisdiction-model')
var log = require('debug')('billtracker:jurisdictionDAO')

module.exports.findById = function findById (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new Error('You must supply a valid Jurisdiction ID'))
  }

  Jurisdiction.findById(req.params.id, function (err, jurisdiction) {
    if (err || !jurisdiction) {
      log('Error finding Jurisdiction')
      return next(err)
    }

    log('Found Jurisdiction with ID ' + jurisdiction._id)

    req.jurisdiction = jurisdiction

    return next()
  })
}

module.exports.find = function find (req, res, next) {
  Jurisdiction
  .find()
  .limit(1000)
  .sort('name')
  .exec(function (err, jurisdictions) {
    if (err || !jurisdictions) {
      log('Eror finding jurisdictions: ' + err)
      return next(err)
    }

    log('Returning all jurisdictions')

    req.jurisdictions = jurisdictions

    return next()
  })
}

module.exports.create = function create (req, res, next) {
  var jurisdiction = new Jurisdiction({
    name: req.body.name
  })

  jurisdiction.save(function (err) {
    if (err) return next(err)

    log('Created Jurisdiction with id ' + jurisdiction._id)

    req.jurisdiction = jurisdiction

    next()
  })
}

module.exports.update = function update (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new Error('You must supply a valid Jurisdiction ID'))
  }

  Jurisdiction.findById(req.params.id, function (err, jurisdiction) {
    if (err) return next(err)

    req.jurisdiction = jurisdiction
    if (req.body.name) jurisdiction.name = req.body.name

    jurisdiction.save(function (err) {
      if (err) return next(err)

      log('Updated Jurisdiction with id ' + jurisdiction._id)

      next()
    })
  })
}
