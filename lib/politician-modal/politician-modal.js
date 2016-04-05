var dialogPolyfill = require('dialog-polyfill')
var template = require('./index.jade')

module.exports = function (politician) {
  var dialog = toDOM(template({politician}))

  document.body.appendChild(dialog)

  if (!dialog.showModal) dialogPolyfill.registerDialog(dialog)

  dialog.showModal()

  var close = dialog.querySelector('[data-close]')

  if (close) {
    close.addEventListener('click', function () {
      dialog.close()
    })
  }

  dialog.addEventListener('click', function (event) {
    var rect = dialog.getBoundingClientRect()
    var isInDialog = rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width

    if (!isInDialog) dialog.close()
  })
}

function toDOM (string) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = string
  return wrapper.firstChild
}
