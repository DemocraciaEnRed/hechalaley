module.exports = function (app) {
  var log = require('debug')('billtracker:bills');

  var Bill = require('lib/bill/bill-model');
  var BillDAO = require('lib/bill/bill-dao');
  var gitInterface = require('lib/git-interface');

  app.get('/api/bills', function (req, res) {
    Bill.find(function (err, bills) {
      if (!err) {
        res.send(bills);
      } else {
        log('ERROR: ' + err);
      }
    });
  });

  app.get('/api/bills/:id',
    BillDAO.findById,
    gitInterface.readFullFileHistory,
    function (req, res, next) {
      if (!req.bill) res.send(404, 'No Bill found for ID ' + req.params.id);

      res.send(req.bill);
    }
  );

  app.get('/api/bills/:id/stages/:stageID/diffs', function (req, res) {
    Bill.findById(req.params.id, function (err, bill) {
      if (!err) {
        gitInterface.getFileDiffs(req.params.id, req.params.stageID, function (diffList) {
          var diffArray = [];

          diffList.forEach(function (diff) {
            diff.patches().then(function (patches) {
              patches.forEach(function (patch) {
                patch.hunks().then(function (hunks) {
                  hunks.forEach(function (hunk) {
                    hunk.lines().then(function (lines) {
                      // log('diff', patch.oldFile().path(), patch.newFile().path());
                      // log(hunk.header().trim());
                      lines.forEach(function (line) {
                        var diffString = String.fromCharCode(line.origin()) + line.content().trim();
                        log(diffString);
                        diffArray.push(diffString);
                      });
                    });
                  });
                });
              });
            }).then(
              res.send({
                'result': 'ok',
                'diffs': diffArray
              }));
          });
        });
      } else {
        log('ERROR: ' + err);
      }
    });
  });

  app.post('/api/bills', function (req, res) {
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

  app.put('/api/bills/:id', function (req, res) {
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
