var Bill = require('lib/bill/bill-model');
var log = require('debug')('billtracker:billDAO');
var git = require('lib/git-interface');

module.exports.findById = function findById(req, res, next) {
  if (req.params.id === 'undefined') {
    return next(new Error('You must supply a Bill ID'));
  }

  Bill.findById(req.params.id, function (err, bill) {
    if (err || !bill) {
      log('Error finding Bill');
      return next(err);
    }

    log('Found Bill with ID ' + bill._id);

    req.bill = bill;

    return next();
  });
};

module.exports.find = function find(req, res, next) {
  Bill.find(function (err, bills) {
    if (err || !bills) {
      log('Eror finding bills: ' + err);
      return next(err);
    }

    log('Returning all Bills');

    req.bills = bills;

    return next();
  });
};

module.exports.create = function create(req, res, next) {
  var billContents = req.body.contents;

  var bill = new Bill({
    title: req.body.title,
    subTitle: req.body.subTitle,
    summary: req.body.summary,
    author: req.body.author,
    stages: []
  });

  bill.save(function (err) {
    if (err) return next(err);

    log('Created Bill with id ' + bill._id);

    req.bill = bill;
    req.billContents = billContents;

    next();
  });
};

module.exports.addStage = function addStage(req, res, next) {
  var commitID = req.commitID;
  if (!commitID) {
    log('Since there are no changes commited to git, no stage will be added');
    return next();
  }

  var bill = req.bill;

  bill.stages.push({
    stageID: commitID,
    stageAuthor: req.body.author
  });

  bill.save(function (err) {
    if (err) {
      log('SEVERE: Bill was saved but stages update failed. Bill is now in an inconsistent state.');
      return next(err);
    }

    next();
  });
};

module.exports.update = function update(req, res, next) {
  Bill.findById(req.params.id, function (err, bill) {
    if (err) return next(err);

    req.bill = bill;
    if (req.body.title) bill.title = req.body.title;
    if (req.body.subTitle) bill.subTitle = req.body.subTitle;
    if (req.body.summary) bill.summary = req.body.summary;

    bill.save(function (err) {
      if (err) return next(err);

      log('Updated Bill with id ' + bill._id);

      req.billContents = req.body.contents;
      next();
    });
  });
};
