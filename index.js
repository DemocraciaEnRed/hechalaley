const config = require('dos-config')
const server = require('./server')
const api = require('./api')
const client = require('./client')

server.use('/api', api)
server.get('*', client)

Promise.all([
  api.ready(),
  client.ready()
])
  .then(() => server.start(config.port))
  .then(() => {
    console.log(`· Server started on port ${config.port} ·`)
  }).catch((err) => {
    console.error(err)
    process.exit(1) // eslint-disable-line no-process-exit
  })
