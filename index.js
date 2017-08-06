const config = require('dos-config')
const express = require('express')
const debug = require('debug')
const api = require('./api')
const client = require('./client')

const log = debug('hechalaley:root')

const server = express()

server.use('/api', api)
server.get('*', client)

Promise.all([
  api.ready(),
  client.ready()
]).then(() => {
  server.listen(config.port, function (err) {
    if (err) throw err
    log(`Hecha la Ley started on port ${config.port}`)
  })
}).catch((err) => {
  log(err)
  process.exit(1) // eslint-disable-line no-process-exit
})
