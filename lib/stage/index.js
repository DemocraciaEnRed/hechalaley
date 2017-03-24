var express = require('express')
var _ = require('lodash/string')
var stringSimilarity = require('string-similarity')
var JsDiff = require('diff')
var Stage = require('lib/stage/stage-dao')
var git = require('lib/git-interface')
var parseJsonParam = require('lib/parse-json-param')
var markdownToHtml = require('./markdownToHtml')

var app = module.exports = express.Router()

app.get('/api/stages',
  parseJsonParam('_filters'),
  Stage.find,
  function (req, res, next) {
    if (!req.stages) {
      return res.status(404).send('No Stages')
    }

    const total = req.stages.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

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
    markdownToHtml(req.stage.contents, function (err, markedDownContents) {
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
  if (req.query.markdown !== 'true') return next()

  var diffContents = ''

  var lines = req.diffResult
  var linesCount = lines.length

  for (var i = 0; i < linesCount; i++) {
    var line = lines[i]
    if (line.isAddition) {
      diffContents += `<ins>${line.contents}</ins>\n`
    } else if (line.isDeletion) {
      var nextLine = lines[i + 1]
      if (nextLine && nextLine.isAddition && areSimilar(line.contents, nextLine.contents)) {
        i++ // Dont parse next line
        JsDiff.diffWords(line.contents, nextLine.contents).forEach(function (part) {
          if (part.added) {
            diffContents += `<ins>${part.value}</ins>`
          } else if (part.removed) {
            diffContents += `<del>${part.value}</del>`
          } else {
            diffContents += part.value
          }
        })
        diffContents += '\n'
      } else {
        diffContents += `<del>${line.contents}</del>\n`
      }
    } else {
      diffContents += line.contents + '\n'
    }
  }

  req.diffResult = markdownToHtml(diffContents)

  return next()
}

function areSimilar (a, b) {
  return stringSimilarity.compareTwoStrings(a, b) >= 0.5
}
