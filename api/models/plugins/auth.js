module.exports = function authSchemaPlugin (schema, options) {
  schema.add({
    email: { type: String, trim: true, required: true, index: true, unique: true }
  })
}
