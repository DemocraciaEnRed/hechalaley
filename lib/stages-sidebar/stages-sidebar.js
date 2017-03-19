var request = require('superagent')
var stageAuthorsUpdate = require('../bills/stage-authors').update

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
    var mostRecentStageID = stages[stages.length - 1].id
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

  stageAuthorsUpdate()

  request.get('/api/stages/' + stageID + '?markdown=true&populate.authors=1&published=true')
    .end(function (err, res) {
      if (err) throw err

      var stage = res.body

      billContents.innerHTML = stage.contents
      billContents.classList.remove('loading')

      stageAuthorsUpdate(stage)
    })
}

function showDiffContents (clickedStage, stages, content) {
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = clickedStage.getAttribute('stage-id')

  var commitID = clickedStage.getAttribute('stage-contents-id')
  var previousCommitID = clickedStage.getAttribute('previous-stage-contents-id')

  var billContents = content.elements.querySelector('[data-bill-contents]')

  var oldActive = content.elements.querySelector('.active[data-stage-link]')
  if (oldActive) oldActive.classList.remove('active')

  clickedStage.classList.add('active')

  var oldLine = content.elements.querySelector('.active[data-stage-line]')
  if (oldLine) oldLine.classList.remove('active')

  var line = content.elements.querySelector('[data-stage-line][stage-id="' + stageID + '"]')
  if (line) line.classList.add('active')

  if (!commitID || commitID === 'undefined') {
    billContents.innerHTML = ''
    return
  }

  if (!previousCommitID || previousCommitID === 'undefined') {
    showCurrentStageContents(clickedStage, content)
    return
  }

  var diffsEndpoint = '/api/diffs/' + commitID + '/' + previousCommitID + '?markdown=true'

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw err
    billContents.innerHTML = res.body.diffs
    billContents.classList.remove('loading')
  })

  billContents.classList.add('loading')
  stageAuthorsUpdate()
}
