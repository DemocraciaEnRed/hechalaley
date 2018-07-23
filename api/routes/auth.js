const { Router } = require('express')
const ms = require('ms')
const dbApi = require('../db-api')
const jwt = require('../jwt')
const { sendEmail } = require('../notifier')
const createUrl = require('../create-url')

const app = Router()

module.exports = app

const SESSION_DURATION = ms('20d')
const LOGIN_TIMEOUT = ms('12hrs')

const sendTokenEmail = (email, token) => {
  const uri = createUrl(`/api/auth/${token}`)

  return sendEmail({
    to: email,
    subject: 'Login a Hecha la Ley',
    html: `
      <p>Para entrar haz click en el link:</p>
      <p><a href="${uri}">${uri}</a></p>
      <p><sub>Fecha de creación: ${(new Date()).toString()}</sub></p>
    `
  })
}

const sendToken = async (email) => {
  const payload = { email }
  const token = await jwt.create(payload, LOGIN_TIMEOUT)
  return sendTokenEmail(email, token)
}

const setCookie = (res, name, payload, duration = 0) =>
  res.cookie(name, payload, {
    maxAge: duration,
    sameSite: true,
    httpOnly: true
  })

const setToken = async (res, email) => {
  const token = await jwt.create({ email }, SESSION_DURATION)
  setCookie(res, 'sessionToken', token, SESSION_DURATION)
  res.cookie('sessionTokenExists', true, { sameSite: true })
}

app.post('/auth/login', async (req, res) => {
  const { email } = req.body

  if (!email) return res.sendStatus(400)

  try {
    const user = await dbApi.users.findByEmail(email)

    if (!user) {
      const isEmpty = await dbApi.users.isEmptyCached()

      if (isEmpty) {
        await dbApi.users.create({ email })
      } else {
        throw new Error('email not found.')
      }
    }

    await sendToken(email)

    res.status(200).json({ code: 'TOKEN_SENDED' })
  } catch (err) {
    res.sendStatus(403)
  }
})

app.get('/auth/logout', (req, res) => {
  res.clearCookie('sessionToken')
  res.clearCookie('sessionTokenExists')
  res.redirect('/admin')
})

app.get('/auth/:token', async (req, res) => {
  const { token } = req.params

  try {
    const { email } = await jwt.verify(token)
    await setToken(res, email)
    res.redirect('/admin')
  } catch (err) {
    res.sendStatus(403)
  }
})
