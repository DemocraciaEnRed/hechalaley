var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');

page('/bills/:id', function (ctx) {
  content.set(template({}));
  componentHandler.upgradeDom();
});

page.exit('/bills/:id', content.clear);
