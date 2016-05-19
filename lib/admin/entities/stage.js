module.exports = function init (nga) {
  var politician = require('./politician')
  var bill = require('./bill')

  var stage = module.exports = nga.entity('stages')
    .identifier(nga.field('_id'))

  stage.listView()
    .fields([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title'),
      nga.field('stageDate', 'datetime')
    ]).filters([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title'))
        .label('Bill')
        .pinned(true)
    ])
    .listActions(['show', 'edit'])

  stage.showView()
    .fields([
      nga.field('billID', 'reference')
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title'),
      nga.field('summary'),
      nga.field('identification'),
      nga.field('stageDate', 'datetime'),
      nga.field('contentsDate', 'datetime').label('Contents Date'),
      nga.field('stageID'),
      nga.field('authors', 'reference_many')
        .label('Editors')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('contents', 'text')
    ])

  var editFields = [
    nga.field('billID', 'reference')
      .validation({ required: true })
      .targetEntity(bill)
      .targetField(nga.field('title')),
    nga.field('title').validation({ required: true }),
    nga.field('summary').validation({ required: true }),
    nga.field('identification'),
    nga.field('stageDate', 'datetime').validation({ required: true }),
    nga.field('authors', 'reference_many')
      .label('Editors')
      .targetEntity(politician)
      .targetField(nga.field('fullname'))
  ]

  stage.editionView().fields(editFields)

  stage.creationView()
    .fields(editFields.concat([
      nga.field('contents', 'text')
    ]))

  return stage
}
