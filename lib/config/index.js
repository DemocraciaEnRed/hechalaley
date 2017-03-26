const path = require('path')

const config = require('democracyos-config')({
  path: path.resolve(__dirname, '..', '..', 'config')
})

module.exports = config
