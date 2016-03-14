console.log('Admin')
require('../../node_modules/ng-admin/build/ng-admin.min.js')
var myApp = window.angular.module('myApp', ['ng-admin'])
myApp.config(['NgAdminConfigurationProvider', function (NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider

  var admin = nga.application('BillTracker Admin')
    .baseApiUrl('/api/') // main API endpoint

  var bill = nga.entity('bills')
    .identifier(nga.field('_id'))

  bill.listView().fields([
    nga.field('_id'),
    nga.field('title'),
    nga.field('summary'),
    nga.field('author')
  ])

  admin.addEntity(bill)

  nga.configure(admin)
}])
