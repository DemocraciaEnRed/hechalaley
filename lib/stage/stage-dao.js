var Stage = require('lib/stage/stage-model')
var log = require('debug')('billtracker:stageDAO')
var _ = require('lodash/array')

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
  if (stageID === 'undefined') {
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

  Stage.find({ billID: billID }, function (err, stages) {
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

module.exports.create = function create (req, res, next) {
  var commitID = req.commitID
  var commitDate = req.commitDate

  var mostRecentStageSoFar = _.last(req.stages)
  log('Bill is ' + req.body.billID + ' and has this stages: ' + req.stages)
  log('Most recent Stage for Bill is ' + mostRecentStageSoFar)

  var stage = new Stage({
    title: req.body.title,
    subTitle: req.body.subTitle,
    billID: req.body.billID,
    authors: req.body.authors,
    contents: req.body.contents,
    stageID: commitID,
    stageDate: commitDate,
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

module.exports.getContentsFromLastStage = function getContentsFromLastStage (req, res, next) {
  var bill = req.bill
  var lastStage = _.last(bill.stages)

  bill.contents = lastStage.contents
  return next()
}
