module.exports = function init (nga) {
  var jurisdiction = require('./jurisdiction')

  var politician = module.exports = nga.entity('politicians')
    .identifier(nga.field('_id'))

  politician.listView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])
    .listActions(['show', 'edit', 'delete'])

  politician.creationView()
    .fields([
      nga.field('name').validation({ required: true }),
      nga.field('lastname').validation({ required: true }),
      nga.field('pictureURL').validation({ required: true }),
      nga.field('appoinment').validation({ required: true }),
      nga.field('party').validation({ required: true }),
      nga.field('jurisdiction', 'reference')
        .targetEntity(jurisdiction)
        .targetField(nga.field('name'))
        .validation({ required: true })
    ])

  politician.editionView()
    .fields(politician.creationView().fields())

  politician.showView()
    .fields(politician.creationView().fields())

  return politician
}
