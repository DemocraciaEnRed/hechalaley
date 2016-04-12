module.exports = function init (nga) {
  var politician = require('./politician')

  var bill = module.exports = nga.entity('bills')
    .identifier(nga.field('_id'))

  bill.listView()
    .fields([
      nga.field('title'),
      nga.field('author', 'reference')
        .targetEntity(politician)
        .targetField(nga.field('fullname'))
    ])
    .listActions(['show', 'edit'])

  bill.creationView()
    .fields([
      nga.field('title').validation({ required: true }),
      nga.field('summary').validation({ required: true }),
      nga.field('author', 'reference')
        .validation({ required: true })
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

  return bill
}
