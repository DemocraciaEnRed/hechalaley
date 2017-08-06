const { Router } = require('express')
const bills = require('../../api/bills/dao')

const app = module.exports = new Router()

app.get('/', (req, res, next) => {
  bills.list({
    published: true
  }).then((results) => {
    req.locals.bills = results.map((result) => result.toJSON())
    next()
  }).catch(next)
})
