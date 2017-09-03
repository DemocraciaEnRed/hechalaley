const express = require('express')
const ms = require('ms')
const dbApi = require('../db-api')
const jwt = require('../jwt')
const notifier = require('../notifier')
const createUrl = require('../create-url')

const app = module.exports = express.Router()

const SESSION_DURATION = ms('20d')
const LOGIN_DURATION = ms('15m')

app.post('/auth/login', (req, res, next) => {
  const { email } = req.body

  if (!email) return res.sendStatus(400)

  dbApi.users.findByEmail(email).then((user) => {
    if (!user) return res.status(403).json({ code: 'USER_NOT_FOUND' })

    return dbApi.tokens.create().then((token) => {
      const id = token._id.toString()

      return Promise.all([
        sendLoginToken(id, email),
        setPingToken(res, id, email)
      ]).then(() => {
        return res.status(200).json({ code: 'TOKEN_SENDED' })
      })
    })
  }).catch(next)
})

app.get('/auth/logout', (req, res) => {
  res.clearCookie('sessionToken')
  res.redirect('/admin')
})

app.get('/auth/:token', (req, res, next) => {
  const sessionToken = req.params.token
  const pingToken = req.cookies && req.cookies['pingToken']

  jwt.verify(sessionToken).then(({ id, email, type }) => {
    if (type === 'LOGIN') {
      return dbApi.tokens.validate(id).then(() => ({ id, email, type }))
    }

    throw new Error('Invalid token type')
  }).then(({ email }) => {
    if (!pingToken) return
    return jwt.verify(pingToken).then(() => setSessionToken(res, email))
  }).then(() => {
    if (pingToken) {
      res.clearCookie('pingToken')
      res.redirect('/admin')
    } else {
      res.status(200).send('<p>Ya puedes entrar!<p>')
    }
  }).catch(() => {
    res.sendStatus(403)
  })
})

app.post('/auth/token', (req, res, next) => {
  const { token } = req.params

  jwt.verify(token).then(({ id, email, type }) => {
    if (type === 'PING') {
      return dbApi.tokens.validated(id).then((validated) => {
        if (!validated) throw new Error('Token not validated')
        return setSessionToken(res)
      })
    }

    if (type === 'LOGIN') {
      return dbApi.tokens.validate(id).then(() => setSessionToken(res))
    }

    throw new Error('Invalid token type')
  }).catch(() => res.sendStatus(403))
})

function sendLoginToken (id, email) {
  const payload = { id, email, type: 'LOGIN' }

  return jwt.create(payload, LOGIN_DURATION).then((token) => {
    const uri = createUrl(`/api/auth/${token}`)

    return notifier.send({
      email: {
        from: 'no-reply@hechalaley.org',
        to: email,
        subject: 'Login a Hecha la Ley',
        html: `
          <p>Para entrar, copia y pega el siguiente link en tu navegador:</p>
          <p>${uri}</p>
          <p><sub>Fecha de creación: ${(new Date()).toString()}</sub></p>
        `.replace(/\s{2,}/g, ' ')
      }
    })
  })
}

function setPingToken (res, id, email) {
  const payload = { id, email, type: 'PING' }

  return jwt.create(payload, LOGIN_DURATION).then((token) => {
    setCookie(res, 'pingToken', token, LOGIN_DURATION)
  })
}

function setSessionToken (res, email) {
  return jwt.create({ email, type: 'SESSION' }, SESSION_DURATION).then((token) => {
    setCookie(res, 'sessionToken', token, SESSION_DURATION)
  })
}

function setCookie (res, name, payload, duration = 0) {
  return res.cookie(name, payload, {
    maxAge: duration,
    sameSite: true,
    httpOnly: true
  })
}
