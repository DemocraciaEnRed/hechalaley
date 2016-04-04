var express = require('express')
var Jurisdiction = require('lib/jurisdiction/jurisdiction-dao')

var app = module.exports = express.Router()

app.get('/api/jurisdictions',
  Jurisdiction.find,
  function (req, res, next) {
    if (!req.jurisdictions) res.status(404).send('No Jurisdictions')

    res.send(req.jurisdictions)
  }
)

app.get('/api/jurisdictions/:id',
  Jurisdiction.findById,
  function (req, res, next) {
    if (!req.jurisdiction) res.status(404).send('No Jurisdiction found for ID ' + req.params.id)
    res.send(req.jurisdiction)
  }
)

app.post('/api/jurisdictions',
  Jurisdiction.create,
  function (req, res, next) {
    res.send(req.jurisdiction)
  }
)

app.put('/api/jurisdictions/:id',
  Jurisdiction.update,
  function (req, res, next) {
    res.send({})
  }
)
