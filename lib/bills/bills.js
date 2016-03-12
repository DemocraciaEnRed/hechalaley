var page = require('page');
var content = require('../site-layout/content');
var template = require('./index.jade');
var request = require('superagent');

page('/bills/:id',
  getBill,
  getLastDiffs,
  function (ctx) {
    content.set(template({
      bill: ctx.bill,
      diffs: ctx.diffs
    }));
    componentHandler.upgradeDom();
  });

page.exit('/bills/:id', content.clear);

function getBill(ctx, next) {
  console.log('Searching for bill with id ' + ctx.params.id);
  request.get('/api/bills/' + ctx.params.id)
    .end(function (err, res) {
      if (err) throw new Error('Error en getBills');

      ctx.bill = res.body;
      next();
    });
}

function getLastDiffs(ctx, next) {
  var bill = ctx.bill;
  console.log('Getting last diffs for Bill ' + bill._id);

  var lastStage = bill.stages[bill.stages.length - 1];

  if (bill.stages.length === 1) {
    ctx.diffs = lastStage.contents;
    return next();
  }

  var previousStage = bill.stages[bill.stages.length - 2];
  var diffsEndpoint = '/api/diffs/' + lastStage.stageID + '/' + previousStage.stageID;

  request.get(diffsEndpoint, function (err, res) {
    if (err) throw new Error('Error en getLastDiffs');

    ctx.diffs = res.body.diffs;
    next();
  });
}
