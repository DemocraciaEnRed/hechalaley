var Stage = require('lib/stage/stage-model')
var log = require('debug')('billtracker:stageDAO')
var _ = require('lodash/array')
var collection = require('lodash/collection')

module.exports.find = function find (req, res, next) {
  Stage.find(function (err, stages) {
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
  var stageID = req.params.id || req.body.stageID
  if (typeof stageID === 'undefined') {
    return next(new Error('You must supply a Stage ID'))
  }

  Stage.findById(stageID, function (err, stage) {
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

  Stage.find({ billID: billID })
    .sort({stageDate: 'asc'})
    .exec(function (err, stages) {
      if (err || !stages) {
        log('Eror finding stages: ' + err)
        return next(err)
      }

      log('Returning all Stages for Bill ' + billID)

      req.billID = billID
      req.stages = stages

      return next()
    })
}

module.exports.getMostRecentStageWithContents = function getMostRecentStageWithContents (req, res, next) {
  req.stage = doGetMostRecentStageWithContents(req.stages)
  next()
}

module.exports.getMostRecentStage = function getMostRecentStage (req, res, next) {
  req.stage = _.last(req.stages)
  next()
}

function doGetMostRecentStageWithContents (stages) {
  // TODO stage order by date
  var stagesWithContents = collection.filter(
    stages,
    function (s) { return s.hasContents }
  )

  return _.last(stagesWithContents)
}

module.exports.create = function create (req, res, next) {
  var commitID = req.commitID
  var commitDate = req.commitDate

  // TODO stage order. When created, stage is added at the end of the list. It should be by date order.
  var mostRecentStageSoFar = doGetMostRecentStageWithContents(req.stages)

  var stage = new Stage({
    title: req.body.title,
    subTitle: req.body.subTitle,
    identification: req.body.identification,
    billID: req.body.billID,
    authors: req.body.authors,
    hasContents: req.body.hasContents,
    contents: req.body.contents,
    stageID: commitID,
    stageDate: req.body.stageDate,
    contentsDate: commitDate,
    previousStageID: mostRecentStageSoFar ? mostRecentStageSoFar.stageID : ''
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

    var commitID = req.commitID
    var commitDate = req.commitDate

    req.stage = stage

    stage.title = req.body.title
    stage.subTitle = req.body.subTitle
    stage.identification = req.body.identification
    stage.billID = req.body.billID
    stage.authors = req.body.authors
    stage.hasContents = req.body.hasContents
    stage.contents = req.body.contents
    stage.stageID = commitID
    stage.stageDate = req.body.stageDate
    stage.contentsDate = commitDate

    // TODO stage order. When created, stage is added at the end of the list. It should be by date order.

    stage.save(function (err) {
      if (err) return next(err)

      log('Updated Stage with id ' + stage._id)

      next()
    })
  })
}
