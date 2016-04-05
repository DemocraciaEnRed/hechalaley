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
  getLastContents,
  getAuthor,
  function (ctx) {
    content.set(template({
      bill: ctx.bill,
      stages: ctx.stages || [],
      diffs: ctx.diffs || [],
      author: ctx.author,
      moment: moment
    }))

    ctx.sidebar = content.elements.querySelector('[data-stages-sidebar]')

    bean.on(
      ctx.sidebar,
      'click',
      '[data-stage-link]',
      sidebar.changeStage,
      ctx.stages,
      content
    )

    ctx.diffToggle = content.elements.querySelector('[data-diff-toggle]')

    bean.on(
      ctx.diffToggle,
      'click',
      sidebar.toggleMode,
      ctx.stages,
      content
    )
  })

page.exit('/bills/:id',
  function (ctx, next) {
    bean.off(ctx.sidebar)
    bean.off(ctx.diffToggle)
    sidebar.cleanup()
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

function getLastContents (ctx, next) {
  if (!ctx.stages.length) return next()

  var lastStage = ctx.stages[ctx.stages.length - 1]

  request.get('/api/stages/' + lastStage._id + '?markdown=true')
    .end(function (err, res) {
      if (err) throw err

      ctx.bill.contents = res.body.contents// .replace(/\n/g, '<br/>')
      next()
    })
}

function getAuthor (ctx, next) {
  request.get('/api/authors/' + ctx.bill.author)
    .end(function (err, res) {
      if (err) throw err

      ctx.author = res.body
      next()
    })
}
