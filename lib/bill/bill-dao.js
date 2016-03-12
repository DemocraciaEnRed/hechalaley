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
  log('about to find bills');
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
    author: req.body.author
  });

  bill.save(function (err) {
    if (!err) {
      log('Created Bill with id ' + bill._id);

      git.commit(bill._id, billContents);
    } else {
      log('ERROR: ' + err);
      return next(err);
    }
  });

  req.bill = bill;
  next();
};

module.exports.update = function update(req, res, next) {
  Bill.findById(req.params.id, function (err, bill) {
    if (!err) {
      if (req.body.title) bill.title = req.body.title;
      if (req.body.subTitle) bill.subTitle = req.body.subTitle;
      if (req.body.summary) bill.summary = req.body.summary;
      if (req.body.author) bill.author = req.body.author;

      bill.save(function (err) {
        if (!err) {
          log('Updated Bill with id ' + bill._id);

          var billContents = req.body.contents;
          if (billContents) {
            git.commit(bill._id, billContents);
          } else {
            log('No change in contents for Bill ' + bill._id);
          }
        } else {
          log('ERROR: ' + err);
          next(err);
        }
        next();
      });
    } else {
      log('ERROR: ' + err);
      next(err);
    }
  });
};
