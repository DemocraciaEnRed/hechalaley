const express = require('express')

const app = module.exports = express.Router()

app.use(require('./jurisdictions'))
app.use(require('./politicians'))
app.use(require('./bills'))
app.use(require('./stages'))
app.use(require('./users'))
