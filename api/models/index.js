const mongoose = require('mongoose')
const connReady = require('mongoose-connection-ready')
const config = require('dos-config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongodbUri, {
  useMongoClient: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  config: { autoIndex: false }
})

module.exports = {
  Jurisdiction: mongoose.model('Jurisdiction', require('./jurisdiction')),
  Politician: mongoose.model('Politician', require('./politician')),
  Bill: mongoose.model('Bill', require('./bill')),
  Stage: mongoose.model('Stage', require('./stage')),
  all: () => mongoose.modelNames().map((name) => mongoose.model(name)),
  ready: () => connReady(mongoose.connection)
}
