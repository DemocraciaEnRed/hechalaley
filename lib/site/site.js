var page = require('page');

require('../material/material');

require('../home/home');
require('../bills/bills');

// Reload the page when it's not handled by the front end
page('*', function (ctx) {
  window.location.reload(false);
});

page();
