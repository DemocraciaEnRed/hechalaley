const { Router } = require('express')
const validate = require('../middlewares/validate')
const requireAuth = require('../middlewares/require-auth')
const dbApi = require('../db-api')

const app = Router()

app.get(
  '/bills',
  requireAuth.if((req) => !req.query.hasOwnProperty('published')),
  (req, res, next) => {
    const query = {}

    if (req.query.hasOwnProperty('published')) query.published = true

    dbApi.bills.list(query).then((results) => {
      const total = results.length
      res.set('Content-Range', `posts 0-${total}/${total}`)

      res.send(results)
    }).catch(next)
  }
)

app.get(
  '/bills/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'coSigners\']') {
      opts.populate = 'coSigners'
    }

    if (req.query.hasOwnProperty('published')) opts.where.published = true

    dbApi.bills.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/bills', requireAuth, (req, res, next) => {
  dbApi.bills.create({
    title: req.body.title,
    summary: req.body.summary,
    published: req.body.published,
    author: req.body.author,
    coSigners: req.body.coSigners
  }).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put(
  '/bills/:id',
  validate.mongoId((req) => req.params.id),
  requireAuth,
  (req, res, next) => {
    dbApi.bills.update(req.params.id, {
      title: req.body.title,
      summary: req.body.summary,
      published: req.body.published,
      author: req.body.author,
      coSigners: req.body.coSigners
    }).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.delete(
  '/bills/:id',
  validate.mongoId((req) => req.params.id),
  requireAuth,
  (req, res, next) => {
    dbApi.bills.trash(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.get(
  '/bills/:id/stages/:stage/text',
  validate.mongoId((req) => req.params.id),
  validate.mongoId((req) => req.params.stage),
  (req, res, next) => {
    const query = {
      bill: req.params.id
    }

    if (req.query.hasOwnProperty('published')) query.published = true

    dbApi.stages.getTextHtml(req.params.stage, query).then((text) => {
      res.send(text)
    }).catch(next)
  }
)

app.get(
  '/bills/:id/diff/:fromStage/:toStage',
  validate.mongoId((req) => req.params.id),
  validate.mongoId((req) => req.params.fromStage),
  validate.mongoId((req) => req.params.toStage),
  (req, res, next) => {
    const query = {
      bill: req.params.id
    }

    if (req.query.hasOwnProperty('published')) query.published = true

    dbApi.stages.getDiffHtml(
      req.params.fromStage,
      req.params.toStage,
      query
    ).then((text) => {
      res.send(text)
    }).catch(next)
  }
)

module.exports = app
