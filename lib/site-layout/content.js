var content = document.querySelector('[data-content]');

module.exports = {
  set: function (el) {
    if (typeof el === 'string') {
      content.innerHTML = el
    } else {
      content.appendChild(el)
    }

    // Update Material Design styles
    componentHandler.upgradeDom()
  },

  clear: function (ctx, next) {
    content.innerHTML = '';
    next();
  }
}
