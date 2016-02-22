module.exports = function(app) {

  var Bill = require('./billModel.js');
  var gitInterface = require('../gitInterface/gitInterface');

  //GET - Return all Bills in the DB
  findAllBills = function(req, res) {
    Bill.find(function(err, bills) {
      if (!err) {
        console.log('GET /Bill');
        res.send(bills);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a Bill with specified ID
  findById = function(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
      if (!err) {
        console.log('GET /bill/' + req.params.id);
        res.send(bill);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Bill in the DB
  addBill = function(req, res) {
    console.log('POST');
    console.log('Bill title: ' + req.body.title);

    var billContents = req.body.contents;


    var bill = new Bill({
      title: req.body.title,
      subTitle: req.body.subTitle,
      summary: req.body.summary,
      author: req.body.author
    });

    bill.save(function(err) {
      if (!err) {
        console.log('Created Bill with id ' + bill._id);

        gitInterface.commitToGit(bill._id, billContents);

      } else {
        console.log('ERROR: ' + err);
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
          console.log('Updated Bill with id ' + bill._id);

          gitInterface.commitToGit(bill._id, billContents);

        } else {
          console.log('ERROR: ' + err);
        }
        res.send(bill);
      });
    });
  };

  //Link routes and functions
  app.get('/bills', findAllBills);
  app.get('/bills/:id', findById);
  app.post('/bill', addBill);
  app.put('/bill/:id', updateBill);

};