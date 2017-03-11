module.exports = function init (nga) {
  var politician = require('./politician')

  var bill = module.exports = nga.entity('bills')
    .identifier(nga.field('_id'))
    .label('Leyes')

  bill.listView()
    .title('Leyes')
    .fields([
      nga.field('published', 'boolean').label('Publicado'),
      nga.field('title').label('Título'),
      nga.field('author', 'reference')
        .label('Firmante')
        .targetEntity(politician)
        .targetField(nga.field('fullname'))
    ])
    .listActions(['show', 'edit'])

  bill.creationView()
    .title('Crear Ley')
    .fields([
      nga.field('published', 'boolean')
        .label('Publicado')
        .validation({ required: true }),
      nga.field('title').label('Título').validation({ required: true }),
      nga.field('summary').label('Descripción').validation({ required: true }),
      nga.field('author', 'reference')
        .label('Firmante')
        .validation({ required: true })
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('coSigners', 'reference_many')
        // had to re-declare entity beacuse of https://github.com/marmelab/ng-admin/issues/765#issuecomment-184648213
        .label('Co-firmantes')
        .targetEntity(nga.entity('politicians').identifier(nga.field('_id')))
        .targetField(nga.field('fullname'))
    ])

  bill.editionView()
    .title('Editar Ley')
    .fields(bill.creationView().fields())

  bill.showView()
    .title('Ley')
    .fields(bill.creationView().fields())

  bill.deletionView().disable()

  return bill
}
