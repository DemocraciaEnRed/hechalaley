const { Router } = require('express')
const bills = require('../../api/bills/dao')
const validate = require('../../api/middlewares/validate')

const app = module.exports = new Router()

app.get('/', (req, res, next) => {
  bills.list({
    published: true
  }).then((results) => {
    req.locals.bills = results.map((result) => result.toJSON())
    req.handle(req, res)
  }).catch(next)
})

app.get('/bills/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    bills.findById(req.params.id, {
      published: true,
      populate: 'coSigners'
    }).then((result) => {
      req.locals.bill = result.toJSON()
      req.client.render(req, res, '/bills')
    }).catch(next)
  }
)
