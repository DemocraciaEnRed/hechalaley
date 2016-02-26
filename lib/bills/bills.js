var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');

page('/bills', function (ctx) {
  console.log('Bills');
  content.innerHTML = template({});
});

page.exit('/bills', function (ctx, next) {
  console.log('Bills Exit');
  content.innerHTML = '';
  next();
});
