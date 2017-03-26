const express = require('express')
const parseJsonQuery = require('./middlewares/parse-json-query')
const models = require('./models')

const app = module.exports = express()

app.use(parseJsonQuery('sort', 'range', 'filter'))

app.use('/api', require('./jurisdictions'))
app.use('/api', require('./politicians'))
app.use('/api', require('./bills'))
app.use('/api', require('./stages'))

module.exports.ready = models.ready
