var marked = require('marked')

function editRendererFactory (tag) {
  var renderer = new marked.Renderer()

  renderer.heading = function heading (text, level) {
    return `<h${level}><${tag}>${text}</${tag}></h${level}>`
  }

  renderer.paragraph = function paragraph (text) {
    return `<${tag}>${text}</${tag}></br>`
  }

  return renderer
}

module.exports = {
  common: new marked.Renderer(),
  addition: editRendererFactory('ins'),
  deletion: editRendererFactory('del')
}
