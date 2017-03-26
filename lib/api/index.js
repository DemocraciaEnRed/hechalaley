const express = require('express')
const models = require('./models')

const app = module.exports = express()

app.use('/api', require('./jurisdictions'))
app.use('/api', require('./politicians'))
app.use('/api', require('./bills'))

module.exports.ready = models.ready
