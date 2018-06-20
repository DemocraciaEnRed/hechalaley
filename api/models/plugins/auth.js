module.exports = function authSchemaPlugin (schema) {
  schema.add({
    email: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true
    }
  })
}
