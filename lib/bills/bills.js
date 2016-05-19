var page = require('page')
var content = require('../site-layout/content')
var template = require('./index.jade')
var request = require('superagent')
var bean = require('bean')
var moment = require('moment')
var sidebar = require('../stages-sidebar/stages-sidebar')
var politicianModal = require('../politician-modal/politician-modal')

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

    let currentStage = ctx.sidebar.querySelector('[data-stage-link]:last-of-type')

    if (currentStage) bean.fire(currentStage, 'click')

    ctx.diffToggle = content.elements.querySelector('[data-diff-toggle]')

    bean.on(
      ctx.diffToggle,
      'click',
      sidebar.toggleMode,
      ctx.stages,
      content
    )

    ctx.author = content.elements.querySelector('[data-author]')

    bean.on(ctx.author, 'click', '[data-politician-modal]', function (evt) {
      let id = evt.currentTarget.getAttribute('data-politician-modal')
      showPolitician(id)
    })
  }
)

function showPolitician (id) {
  request.get('/api/politicians/' + id)
    .end(function (err, res) {
      if (err) throw new Error('Error en showPolitician')
      politicianModal(res.body)
    })
}

page.exit('/bills/:id',
  function (ctx, next) {
    bean.off(ctx.sidebar)
    bean.off(ctx.diffToggle)
    bean.off(ctx.author)
    sidebar.cleanup()
    next()
  },
  content.clear
)

function getBill (ctx, next) {
  request.get('/api/bills/' + ctx.params.id + '?populate.coSigners=1')
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

  request.get('/api/stages/' + lastStage._id + '?markdown=true&populate.authors=1')
    .end(function (err, res) {
      if (err) throw err

      ctx.bill.contents = res.body.contents
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
