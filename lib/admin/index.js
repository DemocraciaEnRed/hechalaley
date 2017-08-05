var express = require('express')

var app = module.exports = express()

app.get('/admin', require('./layout'))
