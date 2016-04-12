var request = require('superagent')
var Batch = require('batch')
// WTF? `require('htmldiff')` doesn't work.
var htmldiff = require('../../node_modules/htmldiff/src/htmldiff.js')

var diffMode = false
var clickedStage

module.exports.cleanup = function cleanup () {
  diffMode = false
  clickedStage = null
}

module.exports.changeStage = function changeStage (event, stages, content) {
  clickedStage = this
  if (!diffMode) {
    showCurrentStageContents(this, content)
  } else {
    showDiffContents(this, stages, content)
  }
}

module.exports.toggleMode = function toggleMode (event, stages, content) {
  diffMode = !diffMode

  var diffSwitch = content.elements.querySelector('[data-diff-switch]')

  diffSwitch.classList[diffMode ? 'add' : 'remove']('active')

  if (!clickedStage) {
    // default to last stage if none was clicked yet
    var mostRecentStageID = stages[stages.length - 1]._id
    var stageElement = content.elements.querySelector('[data-stage-link][stage-id="' + mostRecentStageID + '"]')
    clickedStage = stageElement
  }

  var oldLine = content.elements.querySelector('.active[data-stage-line]')
  if (oldLine) oldLine.classList.remove('active')

  var stageClick = module.exports.changeStage.bind(clickedStage)
  stageClick(event, stages, content)
}

function showCurrentStageContents (clickedStage, content) {
  var stageID = clickedStage.getAttribute('stage-id')
  var billContents = content.elements.querySelector('[data-bill-contents]')

  billContents.classList.add('loading')

  var oldActive = content.elements.querySelector('.active[data-stage-link]')
  if (oldActive) oldActive.classList.remove('active')

  clickedStage.classList.add('active')

  request.get('/api/stages/' + stageID + '?markdown=true')
    .end(function (err, res) {
      if (err) throw err

      billContents.innerHTML = res.body.contents
      billContents.classList.remove('loading')
    })
}

function showDiffContents (clickedStage, stages, content) {
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = clickedStage.getAttribute('stage-id')
  var previousID = clickedStage.getAttribute('previous-stage-id')

  // var commitID = clickedStage.getAttribute('stage-contents-id')
  // var previousCommitID = clickedStage.getAttribute('previous-stage-contents-id')

  var billContents = content.elements.querySelector('[data-bill-contents]')

  var oldActive = content.elements.querySelector('.active[data-stage-link]')
  if (oldActive) oldActive.classList.remove('active')

  clickedStage.classList.add('active')

  var oldLine = content.elements.querySelector('.active[data-stage-line]')
  if (oldLine) oldLine.classList.remove('active')

  var line = content.elements.querySelector('[data-stage-line][stage-id="' + stageID + '"]')
  if (line) line.classList.add('active')

  // if (!commitID || commitID === 'undefined') {
  //   billContents.innerHTML = ''
  //   return
  // }

  // if (!previousCommitID || previousCommitID === 'undefined') {
  //   showCurrentStageContents(clickedStage, content)
  //   return
  // }

  // var diffsEndpoint = '/api/diffs/' + commitID + '/' + previousCommitID + '?markdown=true'

  // request.get(diffsEndpoint, function (err, res) {
  //   if (err) throw err
  //   billContents.innerHTML = res.body.diffs
  // })

  if (!stageID || stageID === 'undefined') {
    billContents.innerHTML = ''
    return
  }

  if (!previousID || previousID === 'undefined') {
    showCurrentStageContents(clickedStage, content)
    return
  }

  billContents.classList.add('loading')

  var batch = new Batch()

  ;[
    stageID,
    previousID
  ].forEach(function (id) {
    batch.push(function (done) {
      request.get('/api/stages/' + id + '?markdown=true').end(done)
    })
  })

  batch.end(function (err, responses) {
    if (err) throw err
    var bodies = responses.map((r) => r.body.contents)
    var diff = htmldiff.apply(htmldiff, bodies)
    billContents.innerHTML = diff
    billContents.classList.remove('loading')
  })
}
