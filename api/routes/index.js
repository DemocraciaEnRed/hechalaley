const mongoose = require('mongoose')
const { Router } = require('express')
const { badRequest } = require('../errors')

const app = Router()

app.use(require('./jurisdictions'))
app.use(require('./politicians'))
app.use(require('./bills'))
app.use(require('./stages'))
app.use(require('./users'))
app.use(require('./auth'))

app.use((err, req, res, next) => {
  if (!(err instanceof mongoose.Error.ValidationError)) return next(err)
  const error = badRequest(err.message, 'VALIDATION_ERROR')
  next(error)
})

module.exports = app
