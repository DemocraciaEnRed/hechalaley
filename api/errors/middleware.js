const path = require('path')
const config = require('dos-config')
const logger = require('../logger')
const { ApiError } = require('.')

exports.handleApiErrors = (err, req, res, next) => {
  if (!err) return next()

  const { method } = req
  const route = path.join(req.app.mountpath, req.url)

  const {
    statusCode = 500,
    errorCode = 'SERVER_ERROR',
    message,
    meta
  } = err

  if (statusCode >= 500) {
    logger.error(`Error: ${method} ${route}`, err)
  }

  if (config.nodeEnv !== 'production' && statusCode < 500) {
    logger.log(`Error: ${method} ${route}`, err)
  }

  const data = {
    code: errorCode,
    // eslint-disable-next-line no-nested-ternary
    message: err instanceof ApiError
      ? message
      : (config.nodeEnv === 'production' ? 'Server error' : message)
  }

  if (meta) data.meta = meta

  if (config.nodeEnv !== 'production' && err.stack) {
    data.stack = err.stack
  }

  return res.status(statusCode).json(data)
}
