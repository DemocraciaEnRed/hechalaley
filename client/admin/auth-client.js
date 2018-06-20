import fetch from 'isomorphic-fetch'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK
} from 'admin-on-rest'

const { Request, Headers } = window

const reducers = {
  [AUTH_LOGIN]: ({ email }) => {
    const req = new Request('/api/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ email }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })

    return fetch(req)
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.statusText)
        }

        return res.json()
      })
      .then(({ code }) => {
        if (code === 'TOKEN_SENDED') {
          return null
        }
      })
  },

  [AUTH_LOGOUT]: () =>
    fetch('/api/auth/logout', { credentials: 'same-origin' }),

  [AUTH_ERROR]: () =>
    Promise.reject(new Error('No te encuentras autorizado.')),

  [AUTH_CHECK]: () => Promise.resolve()
}

export default (type, params) => (
  reducers[type]
    ? reducers[type](params)
    : Promise.reject(new Error('Unknown method'))
)
