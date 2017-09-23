const express = require('express')
const ms = require('ms')
const dbApi = require('../db-api')
const jwt = require('../jwt')
const notifier = require('../notifier')
const createUrl = require('../create-url')

const app = module.exports = express.Router()

const SESSION_DURATION = ms('20d')
const LOGIN_TIMEOUT = ms('15m')

class TokensStack extends Array {
  push (...val) {
    if (this.length === 1) this.pop()
    super.push(...val)
  }
}

const usedTokens = new TokensStack()

app.post('/auth/login', (req, res, next) => {
  const { email } = req.body

  if (!email) return res.sendStatus(400)

  dbApi.users.findByEmail(email)
    .then((user) => {
      if (!user) throw new Error('email not found.')
    })
    .then(() => sendToken(email))
    .then(() => res.status(200).json({ code: 'TOKEN_SENDED' }))
    .catch(() => res.sendStatus(403))
})

app.get('/auth/logout', (req, res) => {
  res.clearCookie('sessionToken')
  res.redirect('/admin')
})

app.get('/auth/:token', (req, res, next) => {
  const token = req.params.token

  if (usedTokens.includes(token)) {
    res.status(403).json({ code: 'TOKEN_ALREADY_USED' })
  }

  jwt.verify(token)
    .then(({ email }) => setToken(res, email))
    .then(() => usedTokens.push(token))
    .then(() => res.redirect('/admin'))
    .catch(() => res.sendStatus(403))
})

function sendToken (email) {
  const payload = { email }
  return jwt.create(payload, LOGIN_TIMEOUT).then((token) => {
    return sendTokenEmail(email, token)
  })
}

function sendTokenEmail (email, token) {
  const uri = createUrl(`/api/auth/${token}`)

  return notifier.send({
    email: {
      from: 'Hecha la Ley <no-reply@hechalaley.org>',
      to: email,
      subject: 'Login a Hecha la Ley',
      html: `
        <p>Para entrar haz click en el link:</p>
        <p><a href="${uri}">${uri}</a></p>
        <p><sub>Fecha de creación: ${(new Date()).toString()}</sub></p>
      `.replace(/\s{2,}/g, ' ')
    }
  })
}

function setToken (res, email) {
  return jwt.create({ email }, SESSION_DURATION).then((token) => {
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
