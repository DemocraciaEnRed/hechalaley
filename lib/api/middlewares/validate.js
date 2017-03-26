const mongoose = require('mongoose')

exports.mongoId = function mongoId (paramGetter) {
  return function mongoIdMiddleware (req, res, next) {
    const id = paramGetter(req, res)
    if (mongoose.Types.ObjectId.isValid(id)) return next()
    next(new Error('You must supply a valid ID'))
  }
}
