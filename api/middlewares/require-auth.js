const jwt = require('../jwt')

const getFromHeader = (req) => {
  if (!req.headers || !req.headers.authorization) return false

  const { authorization } = req.headers

  if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
    return false
  }

  return authorization.split(' ')[1]
}

const getFromCookie = (req) => !!req.cookies && req.cookies.sessionToken

const requireAuth = (req, res, next) => {
  const token = getFromHeader(req) || getFromCookie(req)

  if (!token) return res.sendStatus(401)

  jwt.verify(token).then((user) => {
    req.user = user
    next()
  }).catch(() => res.sendStatus(403))
}

requireAuth.if = (condition) => (req, res, next) => {
  if (condition(req, res)) {
    requireAuth(req, res, next)
  } else {
    next()
  }
}

module.exports = requireAuth
