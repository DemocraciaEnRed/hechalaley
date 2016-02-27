var express = require('express');

var app = module.exports = express();

app.use('/admin', require('../admin-dashboard'));
