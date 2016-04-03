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
  var activateText = content.elements.querySelector('.text-activate')
  var deactivateText = content.elements.querySelector('.text-deactivate')

  diffMode = !diffMode

  activateText.style.display = diffMode ? 'none' : 'block'
  deactivateText.style.display = !diffMode ? 'none' : 'block'

  if (!clickedStage) {
    // default to last stage if none was clicked yet
    var mostRecentStageID = stages[stages.length - 1]._id
    var stageElement = content.elements.querySelector('[stage-id="' + mostRecentStageID + '"]')
    clickedStage = stageElement
  }

  var stageClick = module.exports.changeStage.bind(clickedStage)
  stageClick(event, stages, content)
}

function showCurrentStageContents (clickedStage, content) {
  var stageID = clickedStage.getAttribute('stage-id')
  var billContents = content.elements.querySelector('[bill-contents]')

  request.get('/api/stages/' + stageID)
    .end(function (err, res) {
      if (err) throw err

      billContents.innerHTML = res.body.contents.replace(/\n/g, '<br/>')
    })
}

function showDiffContents (clickedStage, stages, content) {
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = clickedStage.getAttribute('stage-contents-id')
  var previousStageID = clickedStage.getAttribute('previous-stage-contents-id')

  var billContents = content.elements.querySelector('[bill-contents]')

  if (!stageID || stageID === 'undefined') {
    console.log('no contents')
    billContents.innerHTML = 'This Stage does not have contents.'
    return
  }

  if (!previousStageID || previousStageID === 'undefined') {
    billContents.innerHTML = stages[0].contents.replace(/\n/g, '<br/>')
    return
  }

  var diffsEndpoint = '/api/diffs/' + stageID + '/' + previousStageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw err

    var newContents = ''
    res.body.diffs.forEach(function (diff) {
      var diffContents = diff.contents.trim() === '' ? '&nbsp;' : diff.contents

      newContents = newContents +
        '<span class="' +
        (diff.isAddition ? 'addition' : diff.isDeletion ? 'deletion' : '') +
        '">' +
        diffContents +
        '</span></br>'
    })

    billContents.innerHTML = newContents
  })
}
