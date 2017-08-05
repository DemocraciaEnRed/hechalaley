const path = require('path')
const express = require('express')
const debug = require('debug')
const config = require('dos-config')
const next = require('next')
const api = require('./api')

config.env = process.env.NODE_ENV

const log = debug('hechalaley:root')

const client = next({
  dev: config.env !== 'production',
  dir: path.join(__dirname, 'client')
})

Promise.all([
  api.ready(),
  client.prepare()
]).then(() => {
  const server = express()

  const handle = client.getRequestHandler()

  server.use('/api', api)

  server.get('*', (req, res) => handle(req, res))

  server.listen(config.port, function (err) {
    if (err) throw err
    log(`Hecha la Ley started on port ${config.port}`)
  })
}).catch((err) => {
  log(err)
  throw err
})
