const express = require('express')
const { pick } = require('lodash/fp')
const validate = require('../middlewares/validate')
const dao = require('./dao')

const app = module.exports = express.Router()

const pickAttrs = pick([
  'bill',
  'title',
  'summary',
  'published',
  'identification',
  'authors',
  'stageDate',
  'text'
])

app.get('/stages', function getStages (req, res, next) {
  const query = {}

  if (req.query.hasOwnProperty('published')) query.published = true

  if (req.query.filter && req.query.filter.bill) {
    query.bill = req.query.filter.bill
  }

  dao.list(query).then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get('/stages/:id',
  validate.mongoId((req) => req.params.id),
  function getStage (req, res, next) {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'authors\']') {
      opts.populate = 'authors'
    }

    if (req.query.hasOwnProperty('published')) opts.where.published = true

    dao.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/stages', function createStage (req, res, next) {
  const attrs = pickAttrs(req.body)

  dao.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put('/stages/:id',
  validate.mongoId((req) => req.params.id),
  function updateStage (req, res, next) {
    const attrs = pickAttrs(req.body)

    dao.update(attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.delete('/stages/:id',
  validate.mongoId((req) => req.params.id),
  function trashStage (req, res, next) {
    dao.trash(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)
