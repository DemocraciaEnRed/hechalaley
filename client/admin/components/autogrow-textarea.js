import React, { Component } from 'react'

export default class AutoGrowTextarea extends Component {
  componentDidMount () {
    this.recomputeSize()
  }

  componentDidUpdate () {
    this.recomputeSize()
  }

  recomputeSize = () => {
    const { el } = this
    if (!el) return
    el.style.minHeight = 'auto'
    el.style.minHeight = `${el.scrollHeight}px`
  }

  render () {
    return (
      <textarea
        ref={(el) => { this.el = el }}
        onChange={this.recomputeSize}
        {...this.props}
      />
    )
  }
}
