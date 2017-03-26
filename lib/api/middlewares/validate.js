const mongoIdRegex = /[a-f\d]{24}/

exports.mongoId = function mongoId (paramGetter) {
  return function mongoIdMiddleware (req, res, next) {
    const id = paramGetter(req, res)
    if (mongoIdRegex.test(id)) return next()
    next(new Error('You must supply a valid ID'))
  }
}

exports.oneOf = function oneOf (paramGetter, values) {
  return function oneOfMiddleware (req, res, next) {
    const param = paramGetter(req, res)
    if (values.contains(param)) return next()
    next(new Error(`Parameter should be one of '${values.join(', ')}', instead was given '${param}'.`))
  }
}
