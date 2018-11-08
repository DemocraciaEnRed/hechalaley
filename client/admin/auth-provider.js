import fetch from 'isomorphic-fetch'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK
} from 'react-admin'

const wait = (ms = 0) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export const doLogin = async ({ email }) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })

  const { status } = res

  if (status < 200 || status >= 300) {
    const err = new Error(res.statusText)
    err.status = status
    throw err
  }

  const data = await res.json()

  if (data.code === 'TOKEN_SENDED' && data.notificationCatcherUrl) {
    const link = document.createElement('a')
    link.href = data.notificationCatcherUrl
    link.click()
    await wait(3000)
  }

  return data
}

const reducers = {
  [AUTH_LOGIN]: async () => true,

  [AUTH_LOGOUT]: () =>
    fetch('/api/auth/logout', { credentials: 'same-origin' }),

  [AUTH_ERROR]: async ({ status }) => {
    if (status === 403) {
      const err = new Error('No te encuentras autorizado.')
      err.status = status
      throw err
    }

    const err = new Error('Hubo un error de autenticación.')
    err.status = status

    throw err
  },

  [AUTH_CHECK]: () =>
    !!document.cookie && document.cookie.includes('sessionTokenExists=')
}

export default (type, params) => (
  reducers[type]
    ? reducers[type](params)
    : Promise.reject(new Error('Unknown method'))
)
