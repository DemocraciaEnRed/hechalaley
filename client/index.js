const next = require('next')
const express = require('express')
const config = require('dos-config')

const app = express()

const client = next({
  dev: true || config.nodeEnv === 'development',
  dir: __dirname
})

app.ready = () => client.prepare()

app.get('*', (req, res, next) => {
  req.locals = {}
  req.client = client
  req.handle = client.getRequestHandler()
  next()
})

app.use(require('./routes'))

app.get('*', (req, res) => req.handle(req, res))

module.exports = app
