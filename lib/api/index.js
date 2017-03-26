const express = require('express')

const app = module.exports = express()

app.use('/api', require('./jurisdictions'))
app.use('/api', require('./politicians'))
app.use('/api', require('./bills'))
