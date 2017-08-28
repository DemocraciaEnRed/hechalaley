const { Router } = require('express')
const bills = require('../../api/bills/dao')
const stages = require('../../api/stages/dao')
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
    const id = req.params.id

    bills.findById(id, {
      published: true,
      populate: 'coSigners'
    }).then((result) => {
      const bill = result.toJSON()

      req.locals.bill = bill

      if (bill.stages && bill.stages.length > 0) {
        const stageId = bill.stages[0].id

        req.locals.selected = [stageId]

        return stages.getTextHtml(stageId).then((text) => {
          req.locals.text = text
        })
      }
    }).then(() => {
      req.client.render(req, res, '/bills', { id })
    }).catch(next)
  }
)
