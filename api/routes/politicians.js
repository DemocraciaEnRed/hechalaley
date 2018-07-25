const { Router } = require('express')
const { pick } = require('lodash/fp')
const validate = require('../helpers/validate')
const parseRouteIds = require('../helpers/parse-route-ids')
const requireAuth = require('../helpers/require-auth')
const dbApi = require('../db-api')

const app = Router()

const pickAttrs = pick([
  'firstName',
  'lastName',
  'pictureUrl',
  'appoinment',
  'party',
  'jurisdiction'
])

app.use(['/politicians', '/politicians/*'], requireAuth)

app.get('/politicians', (req, res, next) => {
  dbApi.politicians.list().then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get(
  '/politicians/:ids',
  parseRouteIds('ids'),
  (req, res, next) => {
    dbApi.politicians.findByIds(req.params.ids).then((results) => {
      const total = results.length
      res.set('Content-Range', `posts 0-${total}/${total}`)

      res.send(results)
    }).catch(next)
  }
)

app.get(
  '/politicians/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'jurisdiction\']') {
      opts.populate = 'jurisdiction'
    }

    dbApi.politicians.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/politicians', (req, res, next) => {
  const attrs = pickAttrs(req.body)

  dbApi.politicians.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put(
  '/politicians/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const attrs = pickAttrs(req.body)

    dbApi.politicians.update(req.params.id, attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

module.exports = app
