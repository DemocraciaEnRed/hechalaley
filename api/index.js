const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')
const parseJsonQuery = require('./middlewares/parse-json-query')
const checkNodeVersion = require('./check-node-version')
const models = require('./models')

const log = debug('hechalaley:api')

const app = module.exports = express()

app.ready = () => checkNodeVersion().then(models.ready)

app.use(bodyParser.json())
app.use(parseJsonQuery('sort', 'range', 'filter'))

app.all('*', function apiLog (req, res, next) {
  log(`${req.method.toUpperCase()} ${req.app.mountpath}${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.json(require('../../package.json'))
})

app.use(require('./users'))
app.use(require('./jurisdictions'))
app.use(require('./politicians'))
app.use(require('./bills'))
app.use(require('./stages'))

app.use(function apiError (err, req, res, next) {
  log(`Error: ${req.method.toUpperCase()} ${req.app.mountpath}${req.url}`, err)
  next(err)
})
