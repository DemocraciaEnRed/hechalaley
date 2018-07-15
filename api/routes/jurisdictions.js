const { Router } = require('express')
const { pick } = require('lodash/fp')
const validate = require('../middlewares/validate')
const requireAuth = require('../middlewares/require-auth')
const dbApi = require('../db-api')

const app = Router()

const pickAttrs = pick([
  'name'
])

app.use(['/jurisdictions', '/jurisdictions/*'], requireAuth)

app.get('/jurisdictions', (req, res, next) => {
  dbApi.jurisdictions.list().then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get(
  '/jurisdictions/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    dbApi.jurisdictions.findById(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/jurisdictions', (req, res, next) => {
  const attrs = pickAttrs(req.body)

  dbApi.jurisdictions.create(attrs).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put(
  '/jurisdictions/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const attrs = pickAttrs(req.body)

    dbApi.jurisdictions.update(req.params.id, attrs).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

module.exports = app
