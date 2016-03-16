var page = require('page')
var content = require('../site-layout/content')
var template = require('./index.jade')
var request = require('superagent')
var bean = require('bean')
var sidebar = require('../stages-sidebar')

page('/bills/:id',
  getBill,
  getLastDiffs,
  function (ctx) {
    content.set(template({
      bill: ctx.bill,
      diffs: ctx.diffs,
      modificationCount: ctx.modificationCount
    }))

    bean.on(content.elements, 'click', '[stage-link]', sidebar.changeStage)

    window.componentHandler.upgradeDom()
  })

page.exit('/bills/:id',
  function (ctx, next) {
    bean.off(content.elements, 'click', '[stage-link]', sidebar.changeStage)
    next()
  },
  content.clear
)

function getBill (ctx, next) {
  console.log('Searching for bill with id ' + ctx.params.id)
  request.get('/api/bills/' + ctx.params.id)
    .end(function (err, res) {
      if (err) throw new Error('Error en getBills')

      ctx.bill = res.body
      next()
    })
}

function getLastDiffs (ctx, next) {
  var bill = ctx.bill
  console.log('Getting last diffs for Bill ' + bill._id)

  var lastStage = bill.stages[bill.stages.length - 1]

  if (bill.stages.length === 1) {
    ctx.diffs = lastStage.contents
    ctx.modificationCount = 0
    return next()
  }

  var previousStage = bill.stages[bill.stages.length - 2]
  var diffsEndpoint = '/api/diffs/' + lastStage.stageID + '/' + previousStage.stageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en getLastDiffs')

    ctx.diffs = res.body.diffs
    ctx.modificationCount = res.body.modificationCount

    console.log('modifCount: ' + ctx.modificationCount)

    next()
  })
}

window.selectStage = function selectStage (stageID) {
  alert(stageID)
}
