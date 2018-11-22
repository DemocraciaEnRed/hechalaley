const { Router } = require('express')
const dbApi = require('../../api/db-api')
const validate = require('../../api/helpers/validate')

const app = new Router()

app.get('/', (req, res, next) => {
  dbApi.bills.list({
    published: true
  }).then((results) => {
    req.locals.bills = results.map((result) => result.toJSON())
    req.handle(req, res)
  }).catch(next)
})

app.get(
  '/bills/:id',
  validate.mongoId((req) => req.params.id),
  (req, res, next) => {
    const { id } = req.params

    dbApi.bills.findById(id, {
      published: true,
      populate: {
        coSigners: true,
        stagesAuthors: true
      }
    }).then((result) => {
      const bill = result.toJSON()

      req.locals.bill = bill

      if (bill.stages && bill.stages.length > 0) {
        const stageId = bill.stages[0].id

        req.locals.selectedStagesIds = [stageId]

        return dbApi.stages.getTextHtml(stageId).then((text) => {
          req.locals.text = text
        }).catch(next)
      }
    }).then(() => {
      req.client.render(req, res, '/bills', { id })
    }).catch(next)
  }
)

module.exports = app
