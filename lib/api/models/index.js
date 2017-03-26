const mongoose = require('mongoose')
const connReady = require('mongoose-connection-ready')
const config = require('../../config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUrl, {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
})

module.exports = {
  Bill: mongoose.model('Bill', require('./bill')),
  Jurisdiction: mongoose.model('Jurisdiction', require('./jurisdiction')),
  Politician: mongoose.model('Politician', require('./politician')),
  ready: () => connReady(mongoose.connection)
}
