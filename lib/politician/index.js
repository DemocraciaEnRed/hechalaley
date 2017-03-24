var express = require('express')
var Politician = require('lib/politician/politician-dao')

var app = module.exports = express.Router()

app.get('/api/politicians',
  Politician.find,
  function (req, res, next) {
    if (!req.politicians) res.status(404).send('No Politicians')

    const total = req.politicians.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(req.politicians)
  }
)

const parseIdsRegex = /[a-f\d]{24}(,[a-f\d]{24})+/
app.get('/api/politicians/:ids',
  function parseIds (req, res, next) {
    if (!parseIdsRegex.test(req.params.ids)) return next('route')
    req.params.ids = req.params.ids.split(',')
    return next()
  },
  Politician.findByIds,
  function (req, res, next) {
    if (!req.politicians) {
      res.status(404).send('No Politicians found for IDs ' + req.params.ids)
    }

    res.send(req.politicians)
  }
)

app.get('/api/politicians/:id',
  Politician.findById,
  function (req, res, next) {
    if (!req.politician) {
      res.status(404).send('No Politician found for ID ' + req.params.id)
    }

    res.send(req.politician)
  }
)

app.post('/api/politicians',
  Politician.create,
  function (req, res, next) {
    res.send(req.politician)
  }
)

app.put('/api/politicians/:id',
  Politician.update,
  function (req, res, next) {
    res.send({})
  }
)
