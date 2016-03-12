var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');
var request = require('superagent');

page('/bills/:id', getBill, function (ctx) {
  content.set(template({
    bill: ctx.bill
  }));
  componentHandler.upgradeDom();
});

page.exit('/bills/:id', content.clear);

function getBill (ctx, next) {
  console.log('Searching for bill with id ' + ctx.params.id);
  request.get('/api/bills/' + ctx.params.id)
    .end(function (err, res) {
      if (err) throw new Error('Error en getBills');

      ctx.bill = res.body;
      next();
    });
}
