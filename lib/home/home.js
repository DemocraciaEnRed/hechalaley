var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');

var request = require('superagent');

page('/', getBills, function (ctx) {
  content.set(template({
    bills: ctx.bills
  }));
});

page.exit('/', content.clear);

function getBills (ctx, next) {
  request.get('/api/bills')
    .end(function (err, res) {
      if (err) throw new Error('Error en getBills');

      ctx.bills = res.body;
      next();
    });
}
