var bodyParser = require('body-parser')
var config = require('config')
var express = require('express')
var log = require('debug')('billtracker:root')
var mongoose = require('mongoose')
var os = require('os')

var app = express()

app.use(bodyParser.json())

app.use(function (req, res, next) {
  log(req.method + ' ' + req.path)
  next()
})

app.use(require('./lib/bill'))
app.use(require('./lib/stage'))
app.use(require('./lib/politician'))
app.use(require('./lib/jurisdiction'))

app.use(require('./lib/site'))
app.use(require('./lib/admin'))

app.use(express.static('public'))
app.use(express.static('build'))

app.get('*', function (req, res) {
  res.status(404).send('Not found!')
})

var databaseURL = config.mongoUrl
mongoose.Promise = global.Promise
mongoose.connect(databaseURL, function (err, res) {
  if (err) {
    log('ERROR: connecting to Database. ' + err)
  } else {
    log('Connected to database ' + databaseURL)
    var portNumber = config.port || 3000
    app.listen(portNumber, function () {
      log('BillTracker server running on http://' + os.hostname() + ':' + portNumber)
    })
  }
})
