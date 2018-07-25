const { Router } = require('express')
const { pick } = require('lodash/fp')
const validate = require('../helpers/validate')
const requireAuth = require('../helpers/require-auth')
const dbApi = require('../db-api')

const app = Router()

const pickAttrs = pick([
  'email'
])

app.use(['/users', '/users/*'], requireAuth)

app.get('/users', (req, res, next) => {
  dbApi.users.list().then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get(
  '/users/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    dbApi.users.findById(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/users', (req, res, next) => {
  const attrs = pickAttrs(req.body)

  dbApi.users.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put(
  '/users/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const attrs = pickAttrs(req.body)

    dbApi.users.update(req.params.id, attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.delete(
  '/users/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    dbApi.users.trash(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

module.exports = app
