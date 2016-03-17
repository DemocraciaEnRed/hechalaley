module.exports = function (app) {
  var Bill = require('lib/bill/bill-dao')
  var git = require('lib/git-interface')
  var _ = require('lodash/string')

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
    Bill.getContentsFromLastStage,
    function (req, res, next) {
      if (!req.bill) res.status(404).send('No Bill found for ID ' + req.params.id)

      res.send(req.bill)
    }
  )

  app.post('/api/bills',
    addMissingTrailingNewLine,
    Bill.create,
    git.commit,
    Bill.addStage,
    function (req, res, next) {
      res.send(req.bill)
    }
  )

  /**
    * This function adds a \n at the end of the bill contents,
    * because textareas trim their contents.
    * This caused bug #7 (see https://github.com/DemocraciaEnRed/billtracker/issues/7)
    */
  function addMissingTrailingNewLine (req, res, next) {
    if (!_.endsWith(req.body.contents, '\n')) {
      req.body.contents = req.body.contents + '\n'
    }

    return next()
  }

  app.put('/api/bills/:id',
    addMissingTrailingNewLine,
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
