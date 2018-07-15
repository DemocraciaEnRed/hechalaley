const { Router } = require('express')

const app = Router()

app.use(require('./jurisdictions'))
app.use(require('./politicians'))
app.use(require('./bills'))
app.use(require('./stages'))
app.use(require('./users'))
app.use(require('./auth'))

module.exports = app
