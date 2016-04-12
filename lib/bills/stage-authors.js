import template from './stage-authors.jade'

export function update (stage = {}) {
  if (!stage.authors) clear()
  const container = document.querySelector('[data-stage-authors]')
  container.innerHTML = template({
    politicians: stage.authors
  })
}

export function clear () {
  const container = document.querySelector('[data-stage-authors]')
  container.innerHTML = ''
}
