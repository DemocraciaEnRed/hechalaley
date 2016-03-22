var Politician = require('lib/politician/politician-model')
var log = require('debug')('billtracker:politicianDAO')

module.exports.findById = function findById (req, res, next) {
  if (typeof req.params.id === 'undefined') {
    return next(new Error('You must supply a Politician ID'))
  }

  Politician.findById(req.params.id, function (err, politician) {
    if (err || !politician) {
      log('Error finding Politician')
      return next(err)
    }

    log('Found Politician with ID ' + politician._id)

    req.politician = politician

    return next()
  })
}

module.exports.find = function find (req, res, next) {
  Politician.find(function (err, politicians) {
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
    lastname: req.body.lastname
  })

  politician.save(function (err) {
    if (err) return next(err)

    log('Created Politician with id ' + politician._id)

    req.politician = politician

    next()
  })
}

module.exports.update = function update (req, res, next) {
  Politician.findById(req.params.id, function (err, politician) {
    if (err) return next(err)

    req.politician = politician
    if (req.body.name) politician.name = req.body.name
    if (req.body.lastname) politician.lastname = req.body.lastname

    politician.save(function (err) {
      if (err) return next(err)

      log('Updated Politician with id ' + politician._id)

      next()
    })
  })
}
