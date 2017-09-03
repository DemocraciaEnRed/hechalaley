const NotifmeSdk = require('notifme-sdk').default
const config = require('dos-config')

function createNotifier () {
  return new NotifmeSdk({
    channels: {
      email: config.notifier.email
    }
  })
}

module.exports = createNotifier()
