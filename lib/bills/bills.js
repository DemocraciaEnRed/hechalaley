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

  if (!lastStage.stageID) {
    ctx.diffs = [{
      contents: 'This Stage does not have contents'
    }]
    return next()
  }

  if (ctx.stages.length === 1) {
    // This is the only stage. Showing contents
    ctx.diffs = [{
      contents: lastStage.contents
    }]
    return next()
  }

  var previousStage = ctx.stages[ctx.stages.length - 2]

  if (!previousStage.stageID) {
    // Previous stage does not have contents. Showing last Stage contents.
    ctx.diffs = [{
      contents: lastStage.contents
    }]
    return next()
  }

  getDiffsBetweenStages(lastStage.stageID, previousStage.stageID)
    .catch(() => {
      throw new Error('Error en getLastDiffs')
    })
    .then((data) => {
      ctx.diffs = data.diffs
      next()
    })
}

function getDiffsBetweenStages (a, b) {
  var diffsEndpoint = '/api/diffs/' + a + '/' + b
  return new Promise(function (resolve, reject) {
    request.get(diffsEndpoint, function (err, res) {
      if (err) reject(new Error('Error en getLastDiffs'))
      resolve(res.body)
    })
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
