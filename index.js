const os = require('os')
const path = require('path')
const express = require('express')
const debug = require('debug')
const config = require('dos-config')
const next = require('next')
const api = require('./src/api')

config.env = process.env.NODE_ENV

const log = debug('hechalaley:root')

const app = next({
  dev: config.env !== 'production',
  dir: path.join(__dirname, 'src', 'site')
})

Promise.all([
  api.ready(),
  app.prepare()
]).then(() => {
  const server = express()

  const handle = app.getRequestHandler()

  server.use('/api', api)

  server.get('*', (req, res) => handle(req, res))

  server.listen(config.port, function (err) {
    if (err) throw err
    log(`Server running on http://${os.hostname()}:${config.port}`)
  })
}).catch((err) => {
  log(err)
  throw err
})
