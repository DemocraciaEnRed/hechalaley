import React, { Component } from 'react'
// import { Field } from 'redux-form'
// import Select from 'react-select'
import { Labeled, SelectInput } from 'admin-on-rest/lib/mui'

export default class MultiSelectInput extends Component {
  static defaultProps = {
    addField: true
  }

  render () {
    const {
      choices,
      optionValue,
      optionText,
      label,
      resource,
      source,
      options,
      input: { value }
    } = this.props

    console.log('choices', choices)
    console.log('optionValue', optionValue)
    console.log('optionText', optionText)
    console.log('label', label)
    console.log('resource', resource)
    console.log('source', source)
    console.log('options', options)
    console.log('value', value)

    return (
      <span>Alo</span>
    )
  }
}
