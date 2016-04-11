var delegate = require('delegate-dom')
var closest = require('closest')
var scrollToElement = require('scroll-to-element')

delegate(document.body, '[href^="#"] > *', 'click', function (evt) {
  evt.preventDefault()
  link(closest(evt.target, '[href^="#"]'))
})

delegate(document.body, '[href^="#"]', 'click', function (evt) {
  evt.preventDefault()
  link(evt.target)
})

function link (el) {
  var target = document.querySelector(el.getAttribute('href'))
  if (!target) return
  scrollToElement(target, {duration: 750, ease: 'out-circ'})
}
