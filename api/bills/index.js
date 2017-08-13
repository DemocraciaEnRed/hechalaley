const express = require('express')
const validate = require('../middlewares/validate')
const stagesDao = require('../stages/dao')
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
  function updateBill (req, res, next) {
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

app.delete('/bills/:id',
  validate.mongoId((req) => req.params.id),
  function trashBill (req, res, next) {
    dao.trash(req.params.id).then((result) => {
      res.send(result)
    }).catch(next)
  }
)

app.get('/bills/:id/stages/:stage/text',
  validate.mongoId((req) => req.params.id),
  validate.mongoId((req) => req.params.stage),
  function getStageText (req, res, next) {
    const query = {
      bill: req.params.id
    }

    if (req.query.hasOwnProperty('published')) query.published = true

    stagesDao.getTextHtml(req.params.stage, query).then((text) => {
      res.send(text)
    }).catch(next)
  }
)

app.get('/bills/:id/diff/:fromStage/:toStage',
  validate.mongoId((req) => req.params.id),
  validate.mongoId((req) => req.params.fromStage),
  validate.mongoId((req) => req.params.toStage),
  function getStagesDiff (req, res, next) {
    const query = {
      bill: req.params.id
    }

    if (req.query.hasOwnProperty('published')) query.published = true

    stagesDao.getDiffHtml(
      req.params.fromStage,
      req.params.toStage,
      query
    ).then((text) => {
      res.send(text)
    }).catch(next)
  }
)
