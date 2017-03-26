const express = require('express')
const validate = require('../middlewares/validate')
const dao = require('./dao')

const app = module.exports = express.Router()

app.get('/stages', function getStages (req, res, next) {
  const query = {}

  if (req.query.hasOwnProperty('published')) query.published = true

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
  dao.create({
    bill: req.body.bill,
    title: req.body.title,
    summary: req.body.summary,
    published: req.body.published,
    identification: req.body.identification,
    authors: req.body.authors,
    stageDate: req.body.stageDate,
    text: req.body.text
  }).then((result) => {
    res.send(result)
  }).catch(next)
})

app.put('/stages/:id',
  validate.mongoId((req) => req.params.id),
  function updateStage (req, res, next) {
    dao.update(req.params.id, {
      bill: req.body.bill,
      title: req.body.title,
      summary: req.body.summary,
      published: req.body.published,
      identification: req.body.identification,
      authors: req.body.authors,
      stageDate: req.body.stageDate,
      text: req.body.text
    }).then((result) => {
      res.send(result)
    }).catch(next)
  }
)
