import React, { Component } from 'react'
import Select from 'react-select'
import { Labeled } from 'admin-on-rest/lib/mui'

export default class SearchableSelectInput extends Component {
  static defaultProps = {
    addField: true,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id'
  }

  handleChange = (value) => {
    const { optionValue, input: { onChange }, options: { multi } } = this.props

    if (multi) {
      onChange(value && value.map((val) => val[optionValue]))
    } else {
      onChange(value && value[optionValue])
    }
  }

  handleBlur = () => {
    const { input: { value, onBlur } } = this.props
    onBlur(value)
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
      input: {
        value,
        onFocus
      }
    } = this.props

    return (
      <Labeled
        label={label}
        source={source}
        resource={resource}
        disabled={false}>
        <div>
          <Select
            value={value}
            options={choices}
            labelKey={optionText}
            valueKey={optionValue}
            onFocus={onFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            autoBlur
            {...options} />
        </div>
      </Labeled>
    )
  }
}
