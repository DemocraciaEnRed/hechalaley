const verigy = require('verigy')

module.exports = function authSchemaPlugin (schema, options) {
  schema.add({
    email: { type: String, trim: true, required: true, index: true }
  })

  schema.pre('save', function (next) {
    if (this.isModified('email')) {
      this.email = verigy(this.email)
    }

    next()
  })
}
