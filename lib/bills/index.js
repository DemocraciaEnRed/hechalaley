var express = require('express');

var router = module.exports = express.Router();

router.get('/bills/:id', require('../site-layout'));
