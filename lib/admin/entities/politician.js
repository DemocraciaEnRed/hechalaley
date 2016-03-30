module.exports = function init (nga) {
  var politician = module.exports = nga.entity('politicians')
    .identifier(nga.field('_id'))

  politician.listView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])
    .listActions(['show'])

  politician.creationView()
    .fields([
      nga.field('name').validation({ required: true }),
      nga.field('lastname').validation({ required: true }),
      nga.field('jurisdiction').validation({ required: true })
    ])

  politician.editionView()
    .fields(politician.creationView().fields())

  politician.showView()
    .fields([
      nga.field('name'),
      nga.field('lastname')
    ])

  return politician
}
