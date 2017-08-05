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

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use('/api', api)

  server.get('*', (req, res) => handle(req, res))

  return start(server)
}).catch((err) => {
  log(err)
  throw err
})

function start (server) {
  return api.ready().then(() => {
    server.listen(config.port, function (err) {
      if (err) throw err
      log(`Server running on http://${os.hostname()}:${config.port}`)
    })
  })
}
