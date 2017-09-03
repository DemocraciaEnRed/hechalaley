const { protocol, host, publicPort } = require('dos-config')

let uri = `${protocol}://${host}`

if (
  !(protocol === 'https' && publicPort === 443) &&
  !(protocol === 'http' && publicPort === 80)
) uri += `:${publicPort}`

module.exports = (path = '') => uri + path
