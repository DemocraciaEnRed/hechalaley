const config = require('dos-config')
const express = require('express')
const api = require('./api')
const client = require('./client')

const server = express()

server.use('/api', api)
server.get('*', client)

Promise.all([
  api.ready(),
  client.ready()
]).then(() => {
  server.listen(config.port, (err) => {
    if (err) throw err
    console.log(`· Server started on port ${config.port} ·`)
  })
}).catch((err) => {
  console.error(err)
  process.exit(1) // eslint-disable-line no-process-exit
})
