var request = require('superagent')

module.exports.changeStage = function changeStage (event, bill, content) {
  if (bill.stages.length === 1) {
    console.log('This is the only stage. Nothing to be done.')
    return
  }

  var stageID = this.getAttribute('stage-id')
  console.log('Changing Stage for Bill ' + bill._id)

  var previousStage

  for (var i = 0; i < bill.stages.length; i++) {
    var stage = bill.stages[i]
    if (stageID === stage.stageID) {
      break
    } else {
      console.log('previous stage is ' + stage.stageID)
      previousStage = stage
    }
  }

  if (!previousStage) {
    // stage is the first one. TODO: handle this differently.

    // TODO: how to replace only the modificationCount and not the whole header text?
    var newHeader = 'This is the fist Stage'
    content.elements.querySelector('[stage-header]').innerHTML = newHeader
    return
  }

  // TODO: backend API should provide an easier to use endpoit,
  // needing only to provide one stage,
  // and calculating the other

  var diffsEndpoint = '/api/diffs/' + stageID + '/' + previousStage.stageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en changeStage')

    // TODO: how to update diffs? ctx.diffs = res.body.diffs

    // TODO: how to replace only the modificationCount and not the whole header text?
    var newHeader = 'This Stage contains ' + res.body.modificationCount + ' modifications.'
    content.elements.querySelector('[stage-header]').innerHTML = newHeader
  })
}
