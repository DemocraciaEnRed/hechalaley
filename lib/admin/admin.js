require('../../node_modules/ng-admin/build/ng-admin.min.js')

var dashboard = require('./dashboard.jade')

var admin = module.exports = window.angular.module('admin', ['ng-admin'])

admin.config(['NgAdminConfigurationProvider', function (nga) {
  var app = nga.application('Admin')
    .baseApiUrl('/api/')

  app.addEntity(require('./entities/jurisdiction')(nga))
  app.addEntity(require('./entities/politician')(nga))
  app.addEntity(require('./entities/bill')(nga))
  app.addEntity(require('./entities/stage')(nga))

  app.dashboard(nga.dashboard().template(dashboard()))

  nga.configure(app)
}])
