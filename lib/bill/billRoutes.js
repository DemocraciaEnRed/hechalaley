module.exports = function(app) {

  var log = require('debug')('billtracker:bills');

  var Bill = require('lib/bill/billModel.js');
  var gitInterface = require('lib/gitInterface/gitInterface');

  //GET - Return all Bills in the DB
  findAllBills = function(req, res) {
    Bill.find(function(err, bills) {
      if (!err) {
        log('GET /Bill');
        res.send(bills);
      } else {
        log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a Bill with specified ID
  findById = function(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
      if (!err) {
        log('GET /bill/' + req.params.id);

        gitInterface.readFileFromGit(bill._id, function(gitContents) {

          bill.contents = gitContents;
          res.send(bill);

        });

      } else {
        log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Bill in the DB
  addBill = function(req, res) {
    log('POST');
    log('Bill title: ' + req.body.title);

    var billContents = req.body.contents;


    var bill = new Bill({
      title: req.body.title,
      subTitle: req.body.subTitle,
      summary: req.body.summary,
      author: req.body.author
    });

    bill.save(function(err) {
      if (!err) {
        log('Created Bill with id ' + bill._id);

        gitInterface.commitToGit(bill._id, billContents);

      } else {
        log('ERROR: ' + err);
      }
    });

    res.send(bill);
  };

  //PUT - Update an existing Bill
  updateBill = function(req, res) {

    var billContents = req.body.contents;

    Bill.findById(req.params.id, function(err, bill) {
      bill.title = req.body.title;
      bill.subTitle = req.body.subTitle;
      bill.summary = req.body.summary;
      bill.author = req.body.author;

      bill.save(function(err) {
        if (!err) {
          log('Updated Bill with id ' + bill._id);

          gitInterface.commitToGit(bill._id, billContents);

        } else {
          log('ERROR: ' + err);
        }
        res.send(bill);
      });
    });
  };

  //Link routes and functions
  app.get('/api/bills', findAllBills);
  app.get('/api/bills/:id', findById);
  app.post('/api/bill', addBill);
  app.put('/api/bill/:id', updateBill);

};