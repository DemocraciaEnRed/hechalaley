module.exports = function init (nga) {
  var jurisdiction = module.exports = nga.entity('jurisdictions')
    .identifier(nga.field('_id'))
    .label('Jurisdicciones')

  jurisdiction.listView()
    .title('Jurisdicciones')
    .description('Provincias que luego pueden ser asignadas a los políticos.')
    .fields([
      nga.field('name').label('Título')
    ])
    .listActions(['edit'])

  jurisdiction.creationView()
    .title('Crear nueva Jurisdicción')
    .fields([
      nga.field('name')
        .label('Título')
        .validation({required: true})
    ])

  jurisdiction.editionView()
    .title('Editar Jurisdicción')
    .fields(jurisdiction.creationView().fields())

  return jurisdiction
}
