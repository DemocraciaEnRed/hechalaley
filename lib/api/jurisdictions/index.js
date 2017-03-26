const express = require('express')
const validate = require('../middlewares/validate')
const dao = require('./dao')

const app = module.exports = express.Router()

app.get('/jurisdictions', function getJurisdictions (req, res, next) {
  dao.list.then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get('/jurisdictions/:id',
  validate.mongoId((req) => req.params.id),
  function getJurisdiction (req, res, next) {
    dao.list.then((results) => {
      res.send(results)
    }).catch(next)
  }
)

app.post('/jurisdictions', function createJurisdiction (req, res, next) {
  dao.create({
    name: req.body.name
  }).then((results) => {
    res.send(results)
  }).catch(next)
})

app.put('/jurisdictions/:id',
  validate.mongoId((req) => req.params.id),
  function updateJurisdiction (req, res, next) {
    dao.update(req.params.id, {
      name: req.body.name
    }).then((results) => {
      res.send(results)
    }).catch(next)
  }
)
