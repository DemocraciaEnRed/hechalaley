var marked = require('marked')

function editRendererFactory (tag) {
  var renderer = new marked.Renderer()

  // Wrap first 'text' argument with <ins> or <del> tags
  // on the following functions
  ;[
    'heading',
    'paragraph',
    'listitem',
    'strong',
    'em',
    'link'
    // Only call it on 'text' or all of the above (it's a matter of what do you want to diff)
    // 'text'
  ].forEach(function (name) {
    var fn = renderer[name]
    renderer[name] = function (text) {
      var args = Array.prototype.slice.call(arguments)
      args[0] = `<${tag}>${text}</${tag}>`
      return fn.apply(fn, args)
    }
  })

  return renderer
}

module.exports = {
  common: new marked.Renderer(),
  addition: editRendererFactory('ins'),
  deletion: editRendererFactory('del')
}
