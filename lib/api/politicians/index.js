const express = require('express')
const { pick } = require('lodash/fp')
const validate = require('../middlewares/validate')
const parseRouteIds = require('../middlewares/parse-route-ids')
const dao = require('./dao')

const app = module.exports = express.Router()

const pickAttrs = pick([
  'firstName',
  'lastName',
  'pictureUrl',
  'appoinment',
  'party',
  'jurisdiction'
])

app.get('/politicians', function getPoliticians (req, res, next) {
  dao.list().then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get('/politicians/:ids',
  parseRouteIds('ids'),
  function getPoliticiansByIds (req, res, next) {
    dao.findByIds(req.params.ids).then((results) => {
      const total = results.length
      res.set('Content-Range', `posts 0-${total}/${total}`)

      res.send(results)
    }).catch(next)
  }
)

app.get('/politicians/:id',
  validate.mongoId((req) => req.params.id),
  function getBill (req, res, next) {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'jurisdiction\']') {
      opts.populate = 'jurisdiction'
    }

    dao.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/politicians', function createBill (req, res, next) {
  const attrs = pickAttrs(req.body)

  dao.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put('/politicians/:id',
  validate.mongoId((req) => req.params.id),
  function updateJurisdiction (req, res, next) {
    const attrs = pickAttrs(req.body)

    dao.update(req.params.id, attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)
