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
      nga.field('subTitle'),
      nga.field('stageDate', 'datetime')
    ])
    .listActions(['show'])

  stage.creationView()
    .fields([
      nga.field('billID', 'reference')
        .validation({ required: true })
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title').validation({ required: true }),
      nga.field('subTitle').validation({ required: true }),
      nga.field('identification'),
      nga.field('stageDate', 'datetime').validation({ required: true }),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('hasContents', 'boolean').validation({ required: true }),
      nga.field('contents', 'text')
    ])

  stage.editionView()
    .fields([
      nga.field('billID', 'reference')
        .validation({ required: true })
        .targetEntity(bill)
        .targetField(nga.field('title')),
      nga.field('title').validation({ required: true }),
      nga.field('subTitle').validation({ required: true }),
      nga.field('identification'),
      nga.field('stageDate', 'datetime').validation({ required: true }),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('hasContents', 'boolean').validation({ required: true }),
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
      nga.field('stageDate', 'datetime'),
      nga.field('contentsDate', 'datetime').label('Contents Date'),
      nga.field('stageID'),
      nga.field('authors', 'reference_many')
        .targetEntity(politician)
        .targetField(nga.field('fullname')),
      nga.field('hasContents', 'boolean'),
      nga.field('contents', 'text')
    ])

  return stage
}
