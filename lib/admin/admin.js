require('../../node_modules/ng-admin/build/ng-admin.min.js')
var myApp = window.angular.module('myApp', ['ng-admin'])
myApp.config(['NgAdminConfigurationProvider', function (NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider

  var admin = nga.application('BillTracker Admin')
    .baseApiUrl('/api/')

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

  var bill = nga.entity('bills')
    .identifier(nga.field('_id'))

  bill.listView()
    .fields([
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('summary'),
      nga.field('author', 'reference')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('coSigners', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname'))
    ])
    .listActions(['show'])

  bill.creationView()
    .fields([
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('summary'),
      nga.field('author', 'reference')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('coSigners', 'reference_many')
        // had to re-declare entity beacuse of https://github.com/marmelab/ng-admin/issues/765#issuecomment-184648213
        .targetEntity(nga.entity('politicians').identifier(nga.field('_id')))
        .targetField(nga.field('fullname'))
    ])

  bill.editionView()
    .fields(bill.creationView().fields())

  bill.showView()
    .fields(bill.creationView().fields())

  admin.addEntity(bill)

  var stage = nga.entity('stages')
    .identifier(nga.field('_id'))

  stage.listView()
    .fields([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title'),
      nga.field('subTitle')
    ])
    .listActions(['show'])

  stage.creationView()
    .fields([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('identification'),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('contents', 'text')
    ])

  stage.editionView()
    .fields([
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('identification'),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('contents', 'text')
    ])

  stage.showView()
    .fields([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title'),
      nga.field('subTitle'),
      nga.field('identification'),
      nga.field('stageDate'),
      nga.field('stageID'),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('contents', 'text')
    ])

  admin.addEntity(stage)

  nga.configure(admin)
}])
