const config = require('dos-config')

const shouldSpecifyPort = (protocol, port) =>
  !(protocol === 'https' && port === 443) &&
  !(protocol === 'http' && port === 80)

module.exports = (path = '/') => {
  const { protocol, host, publicPort } = config

  const uri = `${protocol}://${host}`

  const port = shouldSpecifyPort(protocol, publicPort)
    ? `:${publicPort}`
    : ''

  return `${uri}${port}${path}`
}
