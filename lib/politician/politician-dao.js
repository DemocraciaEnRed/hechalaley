var mongoose = require('mongoose')
var Politician = require('lib/politician/politician-model')
var log = require('debug')('billtracker:politicianDAO')

module.exports.findById = function findById (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new Error('You must supply a valid Politician ID'))
  }

  const query = Politician.findById(req.params.id)

  if (req.query.populate === '[\'jurisdiction\']') {
    query.populate('jurisdiction')
  }

  query.exec(function (err, politician) {
    if (err || !politician) {
      log('Error finding Politician')
      return next(err)
    }

    log('Found Politician with ID ' + politician._id)

    req.politician = politician

    return next()
  })
}

module.exports.findByIds = function findByIds (req, res, next) {
  Politician
    .find({ _id: { $in: req.params.ids } })
    .limit(1000)
    .exec(function (err, politicians) {
      if (err || !politicians) {
        log('Eror finding politicians: ' + err)
        return next(err)
      }

      log('Returning politicians by ids')

      req.politicians = politicians

      return next()
    })
}

module.exports.find = function find (req, res, next) {
  Politician.find().limit(1000).exec(function (err, politicians) {
    if (err || !politicians) {
      log('Eror finding politicians: ' + err)
      return next(err)
    }

    log('Returning all politicians')

    req.politicians = politicians

    return next()
  })
}

module.exports.create = function create (req, res, next) {
  var politician = new Politician({
    name: req.body.name,
    lastname: req.body.lastname,
    pictureUrl: req.body.pictureUrl,
    appoinment: req.body.appoinment,
    party: req.body.party,
    jurisdiction: req.body.jurisdiction
  })

  politician.save(function (err) {
    if (err) return next(err)

    log('Created Politician with id ' + politician._id)

    req.politician = politician

    next()
  })
}

module.exports.update = function update (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new Error('You must supply a valid Politician ID'))
  }

  Politician.findById(req.params.id, function (err, politician) {
    if (err) return next(err)

    req.politician = politician
    if (req.body.name) politician.name = req.body.name
    if (req.body.lastname) politician.lastname = req.body.lastname
    if (req.body.pictureUrl) politician.pictureUrl = req.body.pictureUrl
    if (req.body.profileURL) politician.profileURL = req.body.profileURL
    if (req.body.jurisdiction) politician.jurisdiction = req.body.jurisdiction

    politician.save(function (err) {
      if (err) return next(err)

      log('Updated Politician with id ' + politician._id)

      next()
    })
  })
}
