var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');

page('/', function (ctx) {
  console.log('Home');
  content.innerHTML = template({});
});

page.exit('/', function (ctx, next) {
  console.log('Home Exit');
  content.innerHTML = '';
  next();
});
