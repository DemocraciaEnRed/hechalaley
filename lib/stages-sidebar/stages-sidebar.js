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
    billContents.innerHTML = 'This Stage does not have contents.'
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
  })
}

function getOffset (el) {
  var rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight
  }
}

function connect (from, to, color, thickness) {
  var off1 = getOffset(from)
  var off2 = getOffset(to)

  // bottom right
  var x1 = off1.left + off1.width
  var y1 = off1.top + off1.height

  // top right
  var x2 = off2.left + off2.width
  var y2 = off2.top

  // distance
  var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))

  // center
  var cx = ((x1 + x2) / 2) - (length / 2)
  var cy = ((y1 + y2) / 2) - (thickness / 2)

  // angle
  var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

  // make hr
  var htmlLine = '<div style="' + [
    'padding: 0px',
    'margin: 0px',
    'height: ' + thickness + 'px',
    'background-color: ' + color,
    'line-height: 1px',
    'position: absolute',
    'left: ' + cx + 'px',
    'top: ' + cy + 'px',
    'width: ' + length + 'px',
    '-moz-transform: rotate(' + angle + 'deg)',
    '-webkit-transform: rotate(' + angle + 'deg)',
    '-o-transform: rotate(' + angle + 'deg)',
    '-ms-transform: rotate(' + angle + 'deg)',
    'transform: rotate(' + angle + 'deg)'
  ].join(';') + '" />'

  document.body.innerHTML += htmlLine
}
