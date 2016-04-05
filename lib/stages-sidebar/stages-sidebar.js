var request = require('superagent')

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

  var stageClick = module.exports.changeStage.bind(clickedStage)
  stageClick(event, stages, content)
}

function showCurrentStageContents (clickedStage, content) {
  var stageID = clickedStage.getAttribute('stage-id')
  var billContents = content.elements.querySelector('[data-bill-contents]')

  var oldActive = content.elements.querySelector('.active[data-stage-link]')
  if (oldActive) oldActive.classList.remove('active')

  clickedStage.classList.add('active')

  request.get('/api/stages/' + stageID + '?markdown=true')
    .end(function (err, res) {
      if (err) throw err

      billContents.innerHTML = res.body.contents
    })
}

function showDiffContents (clickedStage, stages, content) {
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = clickedStage.getAttribute('stage-contents-id')
  var previousStageID = clickedStage.getAttribute('previous-stage-contents-id')

  var billContents = content.elements.querySelector('[data-bill-contents]')

  if (!stageID || stageID === 'undefined') {
    billContents.innerHTML = 'This Stage does not have contents.'
    return
  }

  if (!previousStageID || previousStageID === 'undefined') {
    showCurrentStageContents(clickedStage, content)
    return
  }

  var diffsEndpoint = '/api/diffs/' + stageID + '/' + previousStageID + '?markdown=true'

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw err
    billContents.innerHTML = res.body.diffs
  })
}
