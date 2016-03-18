module.exports = function (app) {
  var Bill = require('lib/bill/bill-dao')

  app.get('/api/bills',
    Bill.find,
    function (req, res, next) {
      if (!req.bills) res.status(404).send('No Bills')

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
}
