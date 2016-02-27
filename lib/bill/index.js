module.exports = function (app) {
  var log = require('debug')('billtracker:bills');

  var Bill = require('lib/bill/bill-model.js');
  var gitInterface = require('lib/git-interface');

  app.get('/api/bills', function (req, res) {
    Bill.find(function (err, bills) {
      if (!err) {
        log('GET /bills');
        res.send(bills);
      } else {
        log('ERROR: ' + err);
      }
    });
  });

  app.get('/api/bills/:id', function (req, res) {
    Bill.findById(req.params.id, function (err, bill) {
      if (!err) {
        log('GET /bills/' + req.params.id);

        gitInterface.readFileFromGit(bill._id, function (gitContents) {
          bill.contents = gitContents;
          res.send(bill);
        });
      } else {
        log('ERROR: ' + err);
      }
    });
  });

  app.post('/api/bill', function (req, res) {
    log('POST /bill. Title: ' + req.body.title);

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

        gitInterface.commitToGit(bill._id, billContents);
      } else {
        log('ERROR: ' + err);
      }
    });

    res.send(bill);
  });

  app.put('/api/bill/:id', function (req, res) {
    var billContents = req.body.contents;

    Bill.findById(req.params.id, function (err, bill) {
      if (!err) {
        bill.title = req.body.title;
        bill.subTitle = req.body.subTitle;
        bill.summary = req.body.summary;
        bill.author = req.body.author;

        bill.save(function (err) {
          if (!err) {
            log('Updated Bill with id ' + bill._id);

            gitInterface.commitToGit(bill._id, billContents);
          } else {
            log('ERROR: ' + err);
          }
          res.send(bill);
        });
      } else {
        log('ERROR: ' + err);
      }
    });
  });
};
