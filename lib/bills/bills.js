var page = require('page')
var content = require('../site-layout/content')
var template = require('./index.jade')
var request = require('superagent')
var bean = require('bean')
var moment = require('moment')
var sidebar = require('../stages-sidebar')

page('/bills/:id',
  getBill,
  getStages,
  getLastDiffs,
  getAuthor,
  function (ctx) {
    content.set(template({
      bill: ctx.bill,
      stages: ctx.stages || [],
      diffs: ctx.diffs || [],
      modificationCount: ctx.modificationCount,
      author: ctx.author,
      moment: moment
    }))

    ctx.sidebar = content.elements.querySelector('[data-stages-sidebar]')

    bean.on(
      ctx.sidebar,
      'click',
      '[stage-link]',
      sidebar.changeStage,
      ctx.bill,
      ctx.stages,
      content
    )
  })

page.exit('/bills/:id',
  function (ctx, next) {
    // TODO: remove click event, bean.off with selector does not work,
    // see https://github.com/fat/bean/issues/127
    bean.off(ctx.sidebar)
    next()
  },
  content.clear
)

function getBill (ctx, next) {
  request.get('/api/bills/' + ctx.params.id)
    .end(function (err, res) {
      if (err) throw new Error('Error en getBills')

      ctx.bill = res.body
      next()
    })
}

function getStages (ctx, next) {
  request.get('/api/bills/' + ctx.params.id + '/stages')
    .end(function (err, res) {
      if (err) throw new Error('Error en getStages')

      ctx.stages = res.body || []
      next()
    })
}

function getLastDiffs (ctx, next) {
  if (!ctx.stages.length) return next()

  var lastStage = ctx.stages[ctx.stages.length - 1]

  if (ctx.stages.length === 1) {
    ctx.diffs = [{
      contents: lastStage.contents
    }]
    ctx.modificationCount = 'This is the first Stage'
    return next()
  }

  var previousStage = ctx.stages[ctx.stages.length - 2]
  var diffsEndpoint = '/api/diffs/' + lastStage.stageID + '/' + previousStage.stageID

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en getLastDiffs')

    ctx.diffs = res.body.diffs
    ctx.modificationCount = 'This Stage contains ' + res.body.modificationCount + ' modifications'

    next()
  })
}

function getAuthor (ctx, next) {
  request.get('/api/politicians/' + ctx.bill.author)
    .end(function (err, res) {
      if (err) throw new Error('Error fetching Bill Author')

      ctx.author = res.body
      next()
    })
}
