module.exports = function init (nga) {
  var politician = require('./politician')
  var bill = require('./bill')

  var stage = module.exports = nga.entity('stages')
    .identifier(nga.field('_id'))
    .label('Etapas')

  stage.listView()
    .title('Etapas')
    .fields([
      nga.field('published', 'boolean').label('Publicado'),
      nga.field('billID', 'reference')
        .label('Ley')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title').label('Título'),
      nga.field('stageDate', 'datetime').label('Fecha')
    ]).filters([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title'))
        .label('Bill')
        .pinned(true)
    ])
    .listActions(['show', 'edit'])

  stage.showView()
    .title('Etapa')
    .fields([
      nga.field('billID', 'reference')
        .label('Ley')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('published', 'boolean').label('Publicado'),
      nga.field('title').label('Título'),
      nga.field('summary').label('Descripción'),
      nga.field('identification').label('Identificación Oficial'),
      nga.field('stageDate', 'datetime').label('Fecha'),
      nga.field('stageID').label('Commit'),
      nga.field('contentsDate', 'datetime').label('Fecha del Commit'),
      nga.field('authors', 'reference_many')
        .label('Co-firmantes')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('contents', 'text')
        .label('Texto')
        .template('<textarea style="width:100%;min-height:500px" readonly>{{value}}</textarea>')
    ])

  var editFields = [
    nga.field('billID', 'reference')
      .label('Ley')
      .validation({ required: true })
      .targetEntity(bill)
      .targetField(nga.field('title')),
    nga.field('published', 'boolean')
        .label('Publicado')
        .validation({ required: true }),
    nga.field('title').label('Título').validation({ required: true }),
    nga.field('summary').label('Descripción').validation({ required: true }),
    nga.field('identification').label('Identificación Oficial'),
    nga.field('stageDate', 'datetime').label('Fecha').validation({ required: true }),
    nga.field('authors', 'reference_many')
      .label('Co-firmantes')
      .targetEntity(politician)
      .targetField(nga.field('fullname'))
  ]

  stage.editionView()
    .title('Editar Etapa')
    .fields(editFields)

  stage.creationView()
    .title('Crear Etapa')
    .fields(editFields.concat([
      nga.field('contents', 'text').label('Texto')
    ]))

  return stage
}
