const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('dos-config')

const secret = config.jwtToken || crypto.randomBytes(512).toString('hex')

exports.create = function create (payload, expiresIn = '20d') {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

exports.verify = function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}
