const jwt = require('../jwt')

const requireAuth = module.exports = (req, res, next) => {
  const token = getFromHeader(req) || getFromCookie(req)

  if (!token) return res.sendStatus(401)

  jwt.verify(token).then((user) => {
    req.user = user
    next()
  }).catch(() => res.sendStatus(403))
}

function getFromHeader (req) {
  if (!req.headers || !req.headers.authorization) return false

  const { authorization } = req.headers

  if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
    return false
  }

  return authorization.split(' ')[1]
}

function getFromCookie (req) {
  return !!req.cookies && req.cookies['sessionToken']
}

requireAuth.if = (condition) => {
  return (req, res, next) => {
    if (condition(req, res)) {
      requireAuth(req, res, next)
    } else {
      next()
    }
  }
}
