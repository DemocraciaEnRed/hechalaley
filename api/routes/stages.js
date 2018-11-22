const { Router } = require('express')
const { pick } = require('lodash/fp')
const validate = require('../helpers/validate')
const requireAuth = require('../helpers/require-auth')
const dbApi = require('../db-api')

const app = Router()

const pickAttrs = pick([
  'bill',
  'title',
  'summary',
  'published',
  'identification',
  'currentCondition',
  'nextCondition',
  'authors',
  'stageDate',
  'text'
])

app.get(
  '/stages',
  requireAuth.if((req) => !req.query.hasOwnProperty('published')),
  (req, res, next) => {
    const query = {}

    if (req.query.hasOwnProperty('published')) query.published = true

    if (req.query.filter && req.query.filter.bill) {
      query.bill = req.query.filter.bill
    }

    dbApi.stages.list(query).then((results) => {
      const total = results.length
      res.set('Content-Range', `posts 0-${total}/${total}`)

      res.send(results)
    }).catch(next)
  }
)

app.get(
  '/stages/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'authors\']') {
      opts.populate = 'authors'
    }

    if (req.query.hasOwnProperty('published')) opts.where.published = true

    dbApi.stages.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/stages', requireAuth, (req, res, next) => {
  const attrs = pickAttrs(req.body)

  dbApi.stages.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put(
  '/stages/:id',
  validate.mongoId((req) => req.params.id),
  requireAuth,
  (req, res, next) => {
    const attrs = pickAttrs(req.body)

    dbApi.stages.update(req.params.id, attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.delete(
  '/stages/:id',
  validate.mongoId((req) => req.params.id),
  requireAuth,
  (req, res, next) => {
    dbApi.stages.trash(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

module.exports = app
