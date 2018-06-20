const NotifmeSdk = require('notifme-sdk').default
const config = require('dos-config')

const notifier = new NotifmeSdk(config.notifier)

exports.send = (...args) => notifier.send(...args)

exports.sendEmail = ({ to, subject, html }) => notifier.send({
  email: {
    to,
    subject,
    from: 'Hecha la Ley <no-reply@hechalaley.org>',
    html: html.replace(/\s{2,}/g, ' ').trim()
  }
})

