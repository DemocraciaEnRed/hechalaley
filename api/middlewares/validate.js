const mongoIdRegex = /[a-f\d]{24}/

exports.mongoId = (paramGetter) => (req, res, next) => {
  const id = paramGetter(req, res)
  if (mongoIdRegex.test(id)) return next()
  next(new Error('You must supply a valid ID'))
}

exports.oneOf = (paramGetter, values) => (req, res, next) => {
  const param = paramGetter(req, res)
  if (values.contains(param)) return next()

  const err = new Error(`
    Parameter should be one of '${values.join(', ')}',
    instead was given '${param}'.
  `)

  next(err)
}
