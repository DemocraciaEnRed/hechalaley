import { Component } from 'react'
import { addField } from 'react-admin'
import RichTextEditor from 'react-rte'
import { Tabs, Tab } from '@material-ui/core/Tabs'
import Textarea from './autogrow-textarea'

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
    { label: 'Artículo', style: 'header-three' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ]
}

class TextEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      richtext: RichTextEditor.createValueFromString(props.input.value, 'markdown'),
      value: props.input.value
    }
  }

  handleChange = (richtext) => {
    const value = richtext.toString('markdown')

    this.setState({
      richtext,
      value
    }, () => this.props.input.onChange(value))
  }

  handleTextChange = (evt) => {
    const { value } = evt.target
    this.setMarkdown(value)
  }

  setMarkdown = (value) => {
    const richtext = RichTextEditor.createValueFromString(value, 'markdown')

    this.setState({
      richtext,
      value
    }, () => this.props.input.onChange(value))
  }

  render () {
    console.log('reder')
    return (
      <Tabs>
        <Tab label='Texto'>
          <RichTextEditor
            value={this.state.richtext}
            toolbarConfig={toolbarConfig}
            onChange={this.handleChange}
          />
        </Tab>
        <Tab label='Markdown'>
          <p>
            <small>
              <strong>Markdown</strong> es el formato base que se utiliza
              para guardar el texto en la base de datos. Aquí puedes editarlo
              directamente, o copiar y pegarlo desde otras fuentes sin
              arruinar los estilos.
            </small>
          </p>
          <Textarea
            style={{
              boxSizing: 'border-box',
              display: 'block',
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              resize: 'vertical',
              padding: '1rem',
              border: 0
            }}
            value={this.state.value}
            onChange={this.handleTextChange}
          />
        </Tab>
      </Tabs>
    )
  }
}

export default addField(TextEditor)
