var request = require('superagent')

module.exports.changeStage = function changeStage (event, bill, stages, content) {
  console.log('changeStage')
  if (stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = this.getAttribute('stage-id')
  var previousStageID = this.getAttribute('previous-stage-id')

  var billContents = content.elements.querySelector('[bill-contents]')

  if (!previousStageID) {
    billContents.innerHTML = stages[0].contents.replace(/\n/g, '<br/>')
    return
  }

  var diffsEndpoint = '/api/diffs/' + stageID + '/' + previousStageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en changeStage')

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

    billContents.innerHTML = newContents
  })
}
