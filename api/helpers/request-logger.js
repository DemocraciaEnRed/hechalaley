const path = require('path')
const logger = require('../logger')

const elapsed = (from) => Date.now() - from

module.exports = ({ without } = {}) => async (req, res, next) => {
  const { method } = req
  const route = path.join(req.app.mountpath, req.url)

  if (without && route.startsWith(without)) return next()

  const startTime = Date.now()

  req.on('end', () => {
    logger.log(`${method} ${route} - ${elapsed(startTime)}ms`)
  })

  req.on('close', () => {
    logger.log(`[CLOSED] ${method} ${route} - ${elapsed(startTime)}ms`)
  })

  next()
}
