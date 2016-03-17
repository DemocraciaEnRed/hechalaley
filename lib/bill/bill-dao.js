var Bill = require('lib/bill/bill-model')
var log = require('debug')('billtracker:billDAO')
var _ = require('lodash/array')

module.exports.findById = function findById (req, res, next) {
  if (req.params.id === 'undefined') {
    return next(new Error('You must supply a Bill ID'))
  }

  Bill.findById(req.params.id, function (err, bill) {
    if (err || !bill) {
      log('Error finding Bill')
      return next(err)
    }

    log('Found Bill with ID ' + bill._id)

    req.bill = bill

    return next()
  })
}

module.exports.getContentsFromLastStage = function getContentsFromLastStage (req, res, next) {
  var bill = req.bill
  var lastStage = _.last(bill.stages)

  bill.contents = lastStage.contents
  return next()
}

module.exports.find = function find (req, res, next) {
  Bill.find(function (err, bills) {
    if (err || !bills) {
      log('Eror finding bills: ' + err)
      return next(err)
    }

    log('Returning all Bills')

    req.bills = bills

    return next()
  })
}

module.exports.create = function create (req, res, next) {
  var billContents = req.body.contents

  var bill = new Bill({
    title: req.body.title,
    subTitle: req.body.subTitle,
    summary: req.body.summary,
    author: req.body.author,
    coSigners: req.body.coSigners,
    stages: []
  })

  bill.save(function (err) {
    if (err) return next(err)

    log('Created Bill with id ' + bill._id)

    req.bill = bill
    req.billContents = billContents

    next()
  })
}

module.exports.addStage = function addStage (req, res, next) {
  var commitID = req.commitID
  if (!commitID) {
    log('Since there are no changes commited to git, no stage will be added')
    return next()
  }

  var bill = req.bill
  var mostRecentStageSoFar = _.last(bill.stages)
  var commitDate = req.commitDate
  bill.stages.push({
    stageID: commitID,
    stageAuthor: req.body.author,
    previousStageID: mostRecentStageSoFar ? mostRecentStageSoFar.stageID : '',
    stageDate: commitDate
  })

  bill.save(function (err) {
    if (err) {
      log('SEVERE: Bill was saved but stages update failed. Bill is now in an inconsistent state.')
      return next(err)
    }

    next()
  })
}

module.exports.update = function update (req, res, next) {
  Bill.findById(req.params.id, function (err, bill) {
    if (err) return next(err)

    req.bill = bill

    bill.title = req.body.title
    bill.subTitle = req.body.subTitle
    bill.summary = req.body.summary
    bill.author = req.body.author
    bill.coSigners = req.body.coSigners

    bill.save(function (err) {
      if (err) return next(err)

      log('Updated Bill with id ' + bill._id)

      req.billContents = req.body.contents
      next()
    })
  })
}
