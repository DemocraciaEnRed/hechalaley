import { Component } from 'react'
import Select from 'react-select'
import { addField, Labeled } from 'react-admin'

class SearchableSelectInput extends Component {
  static defaultProps = {
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
      width = '256px',
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
        disabled={false}
        style={{
          width: width
        }}
      >
          <Select
            value={value}
            options={choices}
            labelKey={optionText}
            valueKey={optionValue}
            onFocus={onFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            autoBlur
            {...options}
          />
      </Labeled>
    )
  }
}

export default addField(SearchableSelectInput)
