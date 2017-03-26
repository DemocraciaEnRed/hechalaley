const express = require('express')
const validate = require('../middlewares/validate')
const dao = require('./dao')

const app = module.exports = express.Router()

app.get('/bills', function getBills (req, res, next) {
  const query = {}

  if (req.query.hasOwnProperty('published')) query.published = true

  dao.list(query).then((results) => {
    const total = results.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(results)
  }).catch(next)
})

app.get('/bills/:id',
  validate.mongoId((req) => req.params.id),
  function getBill (req, res, next) {
    const opts = { where: {}, populate: {} }

    if (req.query.populate === '[\'coSigners\']') {
      opts.populate = 'coSigners'
    }

    if (req.query.hasOwnProperty('published')) opts.where.published = true

    dao.findById(req.params.id, opts).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.post('/bills', function createBill (req, res, next) {
  dao.create({
    title: req.body.title,
    summary: req.body.summary,
    published: req.body.published,
    author: req.body.author,
    coSigners: req.body.coSigners
  }).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put('/bills/:id',
  validate.mongoId((req) => req.params.id),
  function updateJurisdiction (req, res, next) {
    dao.update(req.params.id, {
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
