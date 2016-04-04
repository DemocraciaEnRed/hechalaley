module.exports = function init (nga) {
  var jurisdiction = module.exports = nga.entity('jurisdictions')
    .identifier(nga.field('_id'))

  jurisdiction.listView()
    .fields([
      nga.field('name')
    ])
    .listActions(['show'])

  jurisdiction.creationView()
    .fields([
      nga.field('name').validation({ required: true })
    ])

  jurisdiction.editionView()
    .fields(jurisdiction.creationView().fields())

  jurisdiction.showView()
    .fields([
      nga.field('name')
    ])

  return jurisdiction
}
