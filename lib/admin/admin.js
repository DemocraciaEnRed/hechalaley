console.log('Admin')
require('../../node_modules/ng-admin/build/ng-admin.min.js')
var myApp = window.angular.module('myApp', ['ng-admin'])
myApp.config(['NgAdminConfigurationProvider', function (NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider

  var admin = nga.application('BillTracker Admin')
    .baseApiUrl('/api/')

  var bill = nga.entity('bills')
    .identifier(nga.field('_id'))

  bill.listView()
    .fields([
      nga.field('title'),
      nga.field('summary'),
      nga.field('author')
    ])
    .listActions(['show'])

  bill.creationView()
    .fields([
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('summary'),
      nga.field('author'),
      nga.field('contents', 'text')
    ])

  bill.editionView()
    .fields(bill.creationView().fields())

  bill.showView()
    .fields(bill.creationView().fields())

  admin.addEntity(bill)

  var politician = nga.entity('politicians')
    .identifier(nga.field('_id'))

  politician.listView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])
    .listActions(['show'])

  politician.creationView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])

  politician.editionView()
    .fields(politician.creationView().fields())

  politician.showView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])

  admin.addEntity(politician)

  nga.configure(admin)
}])
