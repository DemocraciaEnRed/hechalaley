module.exports = function (app) {
  var BillDAO = require('lib/bill/bill-dao');
  var git = require('lib/git-interface');

  app.get('/api/bills',
    BillDAO.find,
    function (req, res, next) {
      if (!req.bills) res.status(404).send('No Bills');

      res.send(req.bills);
    }
  );

  app.get('/api/bills/:id',
    BillDAO.findById,
    git.readFullFileHistory,
    function (req, res, next) {
      if (!req.bill) res.status(404).send('No Bill found for ID ' + req.params.id);

      res.send(req.bill);
    }
  );

  app.post('/api/bills',
    BillDAO.create,
    function (req, res, next) {
      res.send(req.bill);
    }
  );

  app.put('/api/bills/:id',
    BillDAO.update,
    function (req, res, next) {
      res.send({
        'result': 'ok'
      });
    }
  );

  app.get('/api/diffs/:stageID1/:stageID2',
    git.getDiffBetweenCommits,
    function (req, res, next) {
      res.send({
        'result': 'ok',
        'diffs': req.diffResult
      });
    }
  );
};
