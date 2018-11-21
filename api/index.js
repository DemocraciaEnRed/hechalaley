const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const hpp = require('hpp')
const { version } = require('../package.json')
const { handleApiErrors } = require('./errors/middleware')
const parseJsonQuery = require('./helpers/parse-json-query')
const models = require('./models')
const checkNodeVersion = require('./helpers/check-node-version')
const requestLogger = require('./helpers/request-logger')

const app = express()

app.disable('x-powered-by')

app.ready = () => checkNodeVersion().then(models.ready)

app.use(requestLogger())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(parseJsonQuery('sort', 'range', 'filter'))
app.use(hpp())

app.use(cors({
  origin: true,
  optionsSuccessStatus: 200
}))

app.get('/', (_, res) => res.json({ version }))

app.use(require('./routes'))

app.use(handleApiErrors)

module.exports = app
