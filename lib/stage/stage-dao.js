const log = require('debug')('billtracker:stageDAO')
// const _ = require('lodash/array')
// const collection = require('lodash/collection')
const Stage = require('lib/stage/stage-model')

module.exports.find = function find (req, res, next) {
  const query = Stage.find()
    .sort('billID stageDate')
    .select('-contents')

  if (req.query._filters && req.query._filters.billID) {
    query.where({ billID: req.query._filters.billID })
  }

  if (req.query['published']) {
    if (req.query['published'] === 'true') query.where({ published: true })
    if (req.query['published'] === 'false') query.where({ published: false })
  }

  query.exec(function (err, stages) {
    if (err || !stages) {
      log('Eror finding stages: ' + err)
      return next(err)
    }

    log('Returning all Stages')

    req.stages = stages

    return next()
  })
}

module.exports.findById = function findById (req, res, next) {
  const query = Stage.findById(req.params.id)

  if (req.query['populate.authors']) query.populate('authors')

  if (req.query['published']) {
    if (req.query['published'] === 'true') query.where({ published: true })
    if (req.query['published'] === 'false') query.where({ published: false })
  }

  query.exec(function (err, stage) {
    if (err || !stage) {
      log('Error finding Stage')
      return next(err)
    }

    log('Found Stage with ID ' + stage._id)

    req.stage = stage

    return next()
  })
}

module.exports.getStagesFromBill = function find (req, res, next) {
  var billID = req.params.billID || req.body.billID

  var query = Stage.find({ billID: billID })
    .sort('billID stageDate')
    .select('-contents')

  if (req.query['published']) {
    if (req.query['published'] === 'true') query.where({ published: true })
    if (req.query['published'] === 'false') query.where({ published: false })
  }

  query.exec(function (err, stages) {
    if (err || !stages) {
      log('Eror finding stages: ' + err)
      return next(err)
    }

    log('Returning all Stages for Bill ' + billID)

    req.stages = stages

    return next()
  })
}

module.exports.create = function create (req, res, next) {
  const stage = new Stage({
    title: req.body.title,
    published: req.body.published,
    summary: req.body.summary,
    identification: req.body.identification,
    billID: req.body.billID,
    authors: req.body.authors,
    stageDate: req.body.stageDate,
    contents: req.body.contents
  })

  stage.save(function (err) {
    if (err) {
      log('SEVERE: Bill was saved but Stages save failed. Bill is now in an inconsistent state.')
      return next(err)
    }

    req.stage = stage

    next()
  })
}

module.exports.update = function update (req, res, next) {
  Stage.findById(req.params.id, function (err, stage) {
    if (err) return next(err)

    req.stage = stage

    stage.title = req.body.title
    stage.published = req.body.published
    stage.summary = req.body.summary
    stage.identification = req.body.identification
    stage.billID = req.body.billID
    stage.authors = req.body.authors
    stage.stageDate = req.body.stageDate
    if (req.body.contents) stage.contents = req.body.contents

    stage.save(function (err) {
      if (err) return next(err)

      log('Updated Stage with id ' + stage._id)

      next()
    })
  })
}
