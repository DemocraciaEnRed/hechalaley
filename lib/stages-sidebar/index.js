var request = require('superagent')

module.exports.changeStage = function changeStage (event, bill, stages, content) {
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = this.getAttribute('stage-id')
  var previousStageID = this.getAttribute('previous-stage-id')

  var stageHeader = content.elements.querySelector('[stage-header]')
  var billContents = content.elements.querySelector('[bill-contents]')

  if (!previousStageID) {
    stageHeader.innerHTML = 'This is the fist Stage'
    billContents.innerHTML = stages[0].contents.replace(/\n/g, '<br/>')
    return
  }

  var diffsEndpoint = '/api/diffs/' + stageID + '/' + previousStageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en changeStage')

    var newHeader = 'This Stage contains ' + res.body.modificationCount + ' modifications.'
    var newContents = ''
    // TODO this is duplicated in lib/bills/index.jade
    res.body.diffs.forEach(function (diff) {
      var diffContents = diff.contents.trim() === '' ? '&nbsp;' : diff.contents

      newContents = newContents +
        '<span class="' +
        (diff.isAddition ? 'addition' : diff.isDeletion ? 'deletion' : '') +
        '">' +
        diffContents +
        '</span></br>'
    })

    stageHeader.innerHTML = newHeader
    billContents.innerHTML = newContents
  })
}
