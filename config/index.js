var path = require('path')

var config = require('democracyos-config')({
  path: __dirname
})

// Resolve absolute path for billsGitPath
config.billsGitPath = path.resolve(__dirname, config.billsGitPath)

module.exports = config
