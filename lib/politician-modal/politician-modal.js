var bean = require('bean')
var template = require('./index.jade')

bean.on(document.body, 'click', '[data-dialog]', function () {
  var dialog = toDOM(template({id: '123123123123'}))
  document.body.appendChild(dialog)
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function() {
   dialog.close();
  });
  // if (! dialog.showModal) {
  //  dialogPolyfill.registerDialog(dialog);
  // }
})

function toDOM (string) {
  var wrapper= document.createElement('div')
  wrapper.innerHTML= string
  return wrapper.firstChild
}