var express = require('express')
var Stage = require('lib/stage/stage-dao')
var git = require('lib/git-interface')
var _ = require('lodash/string')
var parseJsonParam = require('lib/parse-json-param')

var marked = require('marked')

var app = module.exports = express.Router()

app.get('/api/stages',
  parseJsonParam('_filters'),
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
  toMarkdown,
  function (req, res, next) {
    if (!req.stage) {
      return res.status(404).send('No Stage found for ID ' + req.params.id)
    }

    res.send(req.stage)
  }
)

function toMarkdown (req, res, next) {
  if (req.query.markdown === 'true') {
    marked(req.stage.contents, function (err, markedDownContents) {
      if (err) throw err

      req.stage.contents = markedDownContents
      next()
    })
  } else {
    next()
  }
}

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

app.get('/api/bills/:billID/stages/mostRecentWithContents',
  Stage.getStagesFromBill,
  git.readFullFileHistory,
  Stage.getMostRecentStageWithContents,
  function (req, res, next) {
    if (!req.stage) {
      return res.status(404).send('No contents found for Bill ' + req.billID)
    }
    res.send(req.stage)
  }
)

app.get('/api/bills/:billID/stages/mostRecent',
  Stage.getStagesFromBill,
  git.readFullFileHistory,
  Stage.getMostRecentStage,
  function (req, res, next) {
    if (!req.stage) {
      return res.status(404).send('No contents found for Bill ' + req.billID)
    }
    res.send(req.stage)
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
  if (req.body.contents && typeof req.body.contents === 'string') {
    if (!_.endsWith(req.body.contents, '\n')) {
      req.body.contents = req.body.contents + '\n'
    }
  }
  return next()
}

app.get('/api/diffs/:stageID1/:stageID2',
  git.getDiffBetweenCommits,
  toMarkdownDiff,
  function (req, res, next) {
    res.send({
      'diffs': req.diffResult
    })
  }
)

function toMarkdownDiff (req, res, next) {
  if (req.query.markdown === 'true') {
    var renderer = new marked.Renderer()

    var diffContents = ''

    req.diffResult.forEach(function (line) {
      var lineContents = line.contents

      renderer.heading = function (text, level) {
        var diffClass = ''
        var headingText = text

        if (line.isAddition) {
          diffClass = 'addition'
        } else if (line.isDeletion) {
          diffClass = 'deletion'
        }

        return '<h' + level + ' class="' + diffClass + '">' + headingText + '</h' + level + '>'
      }

      renderer.paragraph = function (text, level) {
        var diffClass = ''
        var headingText = text

        if (line.isAddition) {
          diffClass = 'addition'
          return '<span class="' + diffClass + '">' + headingText + '</span></br>'
        } else if (line.isDeletion) {
          diffClass = 'deletion'
          return '<span class="' + diffClass + '">' + headingText + '</span></br>'
        } else {
          return headingText + '</br>'
        }
      }

      lineContents = marked(lineContents, { renderer: renderer })

      diffContents = diffContents + lineContents // + '\n'
    })

    req.diffResult = diffContents
    return next()
  } else {
    return next()
  }
}
