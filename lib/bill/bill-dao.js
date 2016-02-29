var Bill = require('lib/bill/bill-model.js');
var log = require('debug')('billtracker:billDAO');

module.exports.findById = function findById (req, res, next) {
  req.params = req.params || {};

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
