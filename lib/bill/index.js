var express = require('express')
var Bill = require('./bill-dao')

var app = module.exports = express.Router()

app.get('/api/bills',
  Bill.find,
  function (req, res, next) {
    if (!req.bills) res.status(404).send('No Bills')

    const total = req.bills.length
    res.set('Content-Range', `posts 0-${total}/${total}`)

    res.send(req.bills)
  }
)

app.get('/api/bills/:id',
  Bill.findById,
  function (req, res, next) {
    if (!req.bill) res.status(404).send('No Bill found for ID ' + req.params.id)

    res.send(req.bill)
  }
)

app.post('/api/bills',
  Bill.create,
  function (req, res, next) {
    res.send(req.bill)
  }
)

app.put('/api/bills/:id',
  Bill.update,
  function (req, res, next) {
    res.send({})
  }
)
