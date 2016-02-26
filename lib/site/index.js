var express = require('express');

var app = module.exports = express();

app.use('/', require('../home'));
app.use('/bills', require('../bill-view'));
