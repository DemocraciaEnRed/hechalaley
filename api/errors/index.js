const { STATUS_CODES } = require('http')

class ApiError extends Error {
  constructor (statusCode, errorCode, message = null) {
    super(message || STATUS_CODES[statusCode])
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}

const createError = (statusCode = 500, errorCode = 'SERVER_ERROR', message) =>
  (msg, code) => new ApiError(statusCode, code || errorCode, msg || message)

exports.ApiError = ApiError
exports.createError = createError

exports.serverError = createError(500, 'SERVER_ERROR')
exports.unauthorized = createError(401, 'UNAUTHORIZED')
exports.forbidden = createError(403, 'FORBIDDEN')
exports.badRequest = createError(400, 'BAD_REQUEST')
exports.notFound = createError(404, 'NOT_FOUND')
