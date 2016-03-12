var Bill = require('lib/bill/bill-model');
var log = require('debug')('billtracker:billDAO');

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
