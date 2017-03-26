const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')
const log = require('debug')('billtracker:root')
const config = require('./lib/config')
const api = require('./lib/api')

const app = express()

app.use(bodyParser.json())

app.use(function (req, res, next) {
  log(req.method + ' ' + req.path)
  next()
})

app.use(api)

app.use(require('./lib/admin'))
app.use(require('./lib/site'))

app.use(express.static('public'))
app.use(express.static('build'))

app.get('*', function (req, res) {
  res.status(404).send('Not found.')
})

api.ready()
  .then(() => {
    app.listen(config.port, function () {
      log('Server running on http://' + os.hostname() + ':' + config.port)
    })
  })
  .catch((err) => {
    log(err)
    process.exit(1)
  })
