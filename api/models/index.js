const mongoose = require('mongoose')
const config = require('dos-config')

module.exports = {
  Jurisdiction: mongoose.model('Jurisdiction', require('./jurisdiction')),
  Politician: mongoose.model('Politician', require('./politician')),
  Bill: mongoose.model('Bill', require('./bill')),
  Stage: mongoose.model('Stage', require('./stage')),
  User: mongoose.model('User', require('./user')),
  all: () => mongoose.modelNames().map((name) => mongoose.model(name)),
  ready: () => mongoose.connect(config.mongodbUri, {
    useMongoClient: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
    config: { autoIndex: false }
  })
}
