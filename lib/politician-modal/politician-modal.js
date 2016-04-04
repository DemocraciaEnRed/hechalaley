var dialogPolyfill = require('dialog-polyfill')
var bean = require('bean')
var template = require('./index.jade')

bean.on(document.body, 'disabled_click', '[data-dialog]', function () {
  var dialog = toDOM(template({id: '123123123123'}))

  document.body.appendChild(dialog)

  if (!dialog.showModal) dialogPolyfill.registerDialog(dialog)

  dialog.showModal()
  dialog.querySelector('[data-close]').addEventListener('click', function () {
    dialog.close()
  })
})

function toDOM (string) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = string
  return wrapper.firstChild
}
