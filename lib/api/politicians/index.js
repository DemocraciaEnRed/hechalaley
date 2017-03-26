const express = require('express')
const validate = require('../middlewares/validate')
const parseRouteIds = require('../middlewares/parse-route-ids')
const dao = require('./dao')

const app = module.exports = express.Router()

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
  dao.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pictureUrl: req.body.pictureUrl,
    appoinment: req.body.appoinment,
    party: req.body.party,
    jurisdiction: req.body.jurisdiction
  }).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put('/politicians/:id',
  validate.mongoId((req) => req.params.id),
  function updateJurisdiction (req, res, next) {
    dao.update(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pictureUrl: req.body.pictureUrl,
      appoinment: req.body.appoinment,
      party: req.body.party,
      jurisdiction: req.body.jurisdiction
    }).then((result) => {
      res.send(result)
    }).catch(next)
  }
)
