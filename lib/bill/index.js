module.exports = function (app) {
  var Bill = require('lib/bill/bill-dao')
  var git = require('lib/git-interface')

  app.get('/api/bills',
    Bill.find,
    function (req, res, next) {
      if (!req.bills) res.status(404).send('No Bills')

      res.send(req.bills)
    }
  )

  app.get('/api/bills/:id',
    Bill.findById,
    git.readFullFileHistory,
    function (req, res, next) {
      if (!req.bill) res.status(404).send('No Bill found for ID ' + req.params.id)

      res.send(req.bill)
    }
  )

  app.post('/api/bills',
    Bill.create,
    git.commit,
    Bill.addStage,
    function (req, res, next) {
      res.send(req.bill)
    }
  )

  app.put('/api/bills/:id',
    Bill.update,
    git.commit,
    Bill.addStage,
    function (req, res, next) {
      res.send({})
    }
  )

  app.get('/api/diffs/:stageID1/:stageID2',
    git.getDiffBetweenCommits,
    function (req, res, next) {
      res.send({
        'diffs': req.diffResult,
        'modificationCount': req.modificationCount
      })
    }
  )
}
