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
    webpack: (webpackConfig, { isServer }) => {
      if (config.enableHMR) return webpackConfig
      if (isServer) return webpackConfig
      const hmrIndex = webpackConfig.plugins.findIndex((plugin) => !!plugin.fullBuildTimeout)
      webpackConfig.plugins.splice(hmrIndex, 1)
      return webpackConfig
    }
  }
})

app.ready = () => client.prepare()

app.use(requestLogger({ without: '/_next/' }))

app.get('*', (req, res, next) => {
  if (config.enforceAdmin && req.url.startsWith('/admin')) {
    return res.redirect(config.enforceAdmin)
  }

  if (
    config.enforceClient &&
    !req.url.startsWith('/admin') &&
    !req.url.startsWith('/_next') &&
    !req.url.startsWith('/static')
  ) {
    return res.redirect(config.enforceClient)
  }

  next()
})

app.get('*', (req, res, next) => {
  req.locals = {}
  req.client = client
  req.handle = client.getRequestHandler()
  next()
})

app.use(require('./routes'))

app.get('*', (req, res) => req.handle(req, res))

module.exports = app
