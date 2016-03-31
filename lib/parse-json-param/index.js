module.exports = function parseJsonParam (param) {
  var middleware = function (req, res, next) {
    if (typeof req.query._filters === 'string') {
      try {
        req.query._filters = JSON.parse(req.query._filters)
      } catch (e) {
        return next(e)
      }
    }

    next()
  }

  Object.defineProperty(middleware, 'name', {
    value: 'parseJsonParam_' + param
  })

  return middleware
}
