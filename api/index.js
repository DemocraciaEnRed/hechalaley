const express = require('express')
const bodyParser = require('body-parser')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const debug = require('debug')
const packageJson = require('../package.json')
const parseJsonQuery = require('./middlewares/parse-json-query')
const checkNodeVersion = require('./check-node-version')
const models = require('./models')

const log = debug('hechalaley:api')

const app = express()

app.ready = () => checkNodeVersion().then(models.ready)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(parseJsonQuery('sort', 'range', 'filter'))
app.use(hpp())

app.all('*', (req, res, next) => {
  log(`${req.method.toUpperCase()} ${req.app.mountpath}${req.url}`)
  next()
})

app.get('/', (req, res) => res.json(packageJson))

app.use(require('./routes'))

app.use((err, req, res, next) => {
  log(`Error: ${req.method.toUpperCase()} ${req.app.mountpath}${req.url}`, err)
  next(err)
})

module.exports = app
