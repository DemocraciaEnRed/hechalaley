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

        gitInterface.readFullFileHistory(bill._id, function (commits) {
          commits.forEach(function (entry) {
            bill.stages.push({
              'stageID': entry.commit.sha()
            });
          });

          res.send(bill);
        });
      } else {
        log('ERROR: ' + err);
      }
    });
  });

  app.get('/api/bills/:id/stages/:stageID', function (req, res) {
    Bill.findById(req.params.id, function (err, bill) {
      if (!err) {
        log('/api/bills/' + req.params.id + '/stages / ' + req.params.id);

        gitInterface.readFileFromGit(req.params.id, req.params.stageID, function (contents) {
          res.send({
            'billID': bill._id,
            'stageID': req.params.stageID,
            'contents': contents
          });
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
    log('PUT /bill/' + req.params.id);
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
              gitInterface.commitToGit(bill._id, billContents);
            } else {
              log('No change in contents for Bill ' + bill._id);
            }
          } else {
            log('ERROR: ' + err);
          }
          res.send({
            'result': 'ok'
          });
        });
      } else {
        log('ERROR: ' + err);
      }
    });
  });
};
