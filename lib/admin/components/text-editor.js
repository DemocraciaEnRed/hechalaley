import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

const toolbarConfig = {
  display: [
    'HISTORY_BUTTONS',
    'BLOCK_TYPE_DROPDOWN',
    'INLINE_STYLE_BUTTONS',
    'BLOCK_TYPE_BUTTONS',
    'LINK_BUTTONS'
  ],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Párrafo', style: 'unstyled' },
    { label: 'Título', style: 'header-one' },
    { label: 'Subtítulo', style: 'header-two' },
    { label: 'Sección', style: 'header-three' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ]
}

export default class TextEditor extends Component {
  static defaultProps = {
    addField: true
  }

  constructor (props) {
    super(props)

    this.state = {
      value: RichTextEditor.createValueFromString(props.input.value, 'markdown')
    }
  }

  handleChange = (value) => {
    this.setState({ value })
    this.props.input.onChange(value.toString('markdown'))
  }

  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        toolbarConfig={toolbarConfig}
        onChange={this.handleChange} />
    )
  }
}
