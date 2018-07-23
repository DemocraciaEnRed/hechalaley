const jwt = require('../jwt')

const getFromHeader = (req) => {
  if (!req.headers || !req.headers.authorization) return false

  const { authorization } = req.headers

  if (
    typeof authorization !== 'string'
    || !authorization.startsWith('Bearer ')
  ) {
    return false
  }

  return authorization.split(' ')[1]
}

const getFromCookie = (req) => !!req.cookies && req.cookies.sessionToken

const requireAuth = async (req, res, next) => {
  const token = getFromHeader(req) || getFromCookie(req)

  if (!token) return res.sendStatus(401)

  try {
    req.user = await jwt.verify(token)
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

requireAuth.if = (condition) => (req, res, next) => {
  if (condition(req, res)) {
    requireAuth(req, res, next)
  } else {
    next()
  }
}

module.exports = requireAuth
