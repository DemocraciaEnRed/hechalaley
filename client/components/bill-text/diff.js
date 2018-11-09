export default (str, hide) => {
  if (!hide) return str
  const content = document.createElement('div')
  content.innerHTML = str

  Array.from(content.children).forEach((child) => {
    const items = child.querySelectorAll(hide)
    Array.from(items).forEach((item) => {
      const parent = item.parentElement
      if (!parent) return
      parent.removeChild(item)
      parent.appendChild(item)
    })
  })

  return content.outerHTML
}
