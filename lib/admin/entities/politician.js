module.exports = function init (nga) {
  var jurisdiction = require('./jurisdiction')

  var politician = module.exports = nga.entity('politicians')
    .identifier(nga.field('_id'))
    .label('Políticos')

  politician.listView()
    .title('Políticos')
    .fields([
      nga.field('name').label('Nombre'),
      nga.field('lastname').label('Apellido')
    ])
    .listActions(['show', 'edit', 'delete'])

  politician.creationView()
    .title('Crear Político')
    .fields([
      nga.field('name').label('Nombre').validation({required: true}),
      nga.field('lastname').label('Apellido').validation({required: true}),
      nga.field('bio').label('Bio'),
      nga.field('pictureURL')
        .label('Avatar URL')
        .attributes({placeholder: 'http://perfiles.com/avatar-usuario.jpg'})
        .validation({required: true}),
      nga.field('appoinment')
        .label('Cargo')
        .attributes({placeholder: 'Diputado Nacional'})
        .validation({required: true}),
      nga.field('party')
        .label('Bloque')
        .attributes({placeholder: 'Unión Política Lateral'})
        .validation({required: true}),
      nga.field('jurisdiction', 'reference')
        .label('Jurisdicción')
        .attributes({placeholder: 'Seleccionar Jurisdicción...'})
        .targetEntity(jurisdiction)
        .targetField(nga.field('name'))
        .validation({required: true})
    ])

  politician.editionView()
    .title('Editar Político')
    .fields(politician.creationView().fields())

  politician.showView()
    .title('Político')
    .fields(politician.creationView().fields())

  return politician
}
