const mongoose = require('mongoose')
const connReady = require('mongoose-connection-ready')
const config = require('dos-config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUrl, {
  useMongoClient: true,
  keepAlive: 1,
  connectTimeoutMS: 30000
})

module.exports = {
  Jurisdiction: mongoose.model('Jurisdiction', require('./jurisdiction')),
  Politician: mongoose.model('Politician', require('./politician')),
  Bill: mongoose.model('Bill', require('./bill')),
  Stage: mongoose.model('Stage', require('./stage')),
  ready: () => connReady(mongoose.connection)
}
