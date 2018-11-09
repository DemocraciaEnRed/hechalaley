const next = require('next')
const express = require('express')
const config = require('dos-config')
const requestLogger = require('../api/helpers/request-logger')

const app = express()

app.disable('x-powered-by')

const client = next({
  dev: config.nodeEnv === 'development',
  dir: __dirname,
  conf: {
    poweredByHeader: false,
    /**
     * Disable Hot Module Reloader until we fix the build of assets at /admin
     * when NODE_ENV=production
     */
    webpack: (config, { isServer }) => {
      if (isServer) return config
      const hmrIndex = config.plugins.findIndex((plugin) => !!plugin.fullBuildTimeout)
      config.plugins.splice(hmrIndex, 1)
      return config
    }
  }
})

app.ready = () => client.prepare()

app.use(requestLogger({ without: '/_next/' }))

app.get('*', (req, res, next) => {
  req.locals = {}
  req.client = client
  req.handle = client.getRequestHandler()
  next()
})

app.use(require('./routes'))

app.get('*', (req, res) => req.handle(req, res))

module.exports = app
