const { promisify } = require('util')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('dos-config')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

const secret = config.jwtToken || crypto.randomBytes(512).toString('hex')

exports.create = (payload, expiresIn = '20d') =>
  sign(payload, secret, { expiresIn })

exports.verify = (token) =>
  verify(token, secret)
