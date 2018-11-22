import { Component } from 'react'
import jump from 'jump.js'
import throttle from 'lodash.throttle'
import Router from 'next/router'

/**
 * Add hashChange event to Next.js Router
 */
Router.ready(() => {
  const originalChangeState = Router.router.changeState

  Router.router.changeState = function changeState (method, url, as) {
    if (url.includes('#')) this.events.emit('hashChange', url)
    return originalChangeState.call(this, method, url, as)
  }
})

export default class Anchor extends Component {
  constructor (props) {
    super(props)

    this.handleHashChange = throttle(this.handleHashChange.bind(this), 200, {
      trailing: true
    })
  }

  componentDidMount () {
    this.handleHashChange()

    Router.router.events.on('hashChange', this.handleHashChange)
    Router.router.events.on('routeChangeComplete', this.handleHashChange)
  }

  componentWillUnmount () {
    Router.router.events.off('hashChange', this.handleHashChange)
    Router.router.events.off('routeChangeComplete', this.handleHashChange)
  }

  handleHashChange (url) {
    if (!url) return
    const i = url.indexOf('#')
    if (i === -1) return
    const id = url.slice(i + 1)
    if (id === this.props.id) this.scroll()
  }

  scroll () {
    jump(this.el, {
      duration: 400
    })
  }

  render () {
    return (
      <div {...this.props} ref={(el) => { this.el = el }}>
        { this.props.children }
      </div>
    )
  }
}
