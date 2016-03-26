var express = require('express')
var Stage = require('lib/stage/stage-dao')
var git = require('lib/git-interface')
var _ = require('lodash/string')

var app = module.exports = express.Router()

app.get('/api/stages',
  Stage.find,
  function (req, res, next) {
    if (!req.stages) {
      return res.status(404).send('No Stages')
    }

    res.send(req.stages)
  }
)

app.get('/api/stages/:id',
  Stage.findById,
  function (req, res, next) {
    if (!req.stage) {
      return res.status(404).send('No Stage found for ID ' + req.params.id)
    }

    res.send(req.stage)
  }
)

app.get('/api/bills/:billID/stages',
  Stage.getStagesFromBill,
  git.readFullFileHistory,
  function (req, res, next) {
    if (!req.stages) {
      return res.status(404).send('No Stages found for Bill ' + req.billID)
    }

    res.send(req.stages)
  }
)

app.post('/api/stages',
  addMissingTrailingNewLine,
  git.commit,
  Stage.getStagesFromBill,
  Stage.create,
  function (req, res, next) {
    res.send(req.stage)
  }
)

app.put('/api/stages/:id',
  Stage.findById,
  addMissingTrailingNewLine,
  git.commit,
  Stage.getStagesFromBill,
  Stage.update,
  function (req, res, next) {
    res.send(req.stage)
  }
)

/**
  * This function adds a \n at the end of the bill contents,
  * because textareas trim their contents.
  * This caused bug #7 (see https://github.com/DemocraciaEnRed/billtracker/issues/7)
  */
function addMissingTrailingNewLine (req, res, next) {
  if (req.body.contents) {
    if (!_.endsWith(req.body.contents, '\n')) {
      req.body.contents = req.body.contents + '\n'
    }
  }
  return next()
}

app.get('/api/diffs/:stageID1/:stageID2',
  git.getDiffBetweenCommits,
  function (req, res, next) {
    res.send({
      'diffs': req.diffResult,
      'modificationCount': req.modificationCount
    })
  }
)
