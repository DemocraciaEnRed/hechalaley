const hide = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.style.visibility = 'hidden'
}

const has = (el, selector) => !!el.querySelector(selector)

export default (str, tagToHide) => {
  if (!tagToHide) return str
  const content = document.createElement('div')
  content.innerHTML = str

  Array.from(content.children).forEach((child) => {
    // When the child is a list, move LI items to the bottom, and hide them
    if (child.tagName === 'OL' || child.tagName === 'UL') {
      Array.from(child.children).forEach((li) => {
        if (!has(li, tagToHide)) return
        // Hide and move to bottom
        child.removeChild(li)
        hide(li)
        child.appendChild(li)
      })
    }

    // Hide items
    const items = child.querySelectorAll(tagToHide)
    Array.from(items).forEach(hide)
  })

  return content.outerHTML
}
