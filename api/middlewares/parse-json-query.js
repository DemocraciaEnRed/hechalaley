module.exports = (...keys) => (req, res, next) => {
  try {
    keys.forEach((k) => {
      if (!req.query[k]) return
      if (typeof req.query[k] !== 'string') return

      if (req.query[k][0] !== '{' && req.query[k][0] !== '[') {
        throw new SyntaxError(`Unexpected token ${req.query[k][0]}`)
      }

      req.query[k] = JSON.parse(req.query[k])
    })

    next()
  } catch (err) {
    next(err)
  }
}
