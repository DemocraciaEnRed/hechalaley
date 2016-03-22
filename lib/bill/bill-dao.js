var mongoose = require('mongoose')
var Bill = require('lib/bill/bill-model')
var log = require('debug')('billtracker:billDAO')

module.exports.findById = function findById (req, res, next) {
  var billID = req.params.id || req.body.billID
  if (!mongoose.Types.ObjectId.isValid(billID)) {
    return next(new Error('You must supply a Bill ID'))
  }

  Bill.findById(billID, function (err, bill) {
    if (err || !bill) {
      log('Error finding Bill')
      return next(err)
    }

    log('Found Bill with ID ' + bill._id)

    req.bill = bill

    return next()
  })
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

      next()
    })
  })
}
