import { Component } from 'react'
import { addField } from 'react-admin'
import RichTextEditor from 'react-rte'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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
      value: props.input.value,
      tab: 0
    }
  }

  handleMarkdownChange = (richtext) => {
    const value = richtext.toString('markdown')

    this.setState({
      richtext,
      value
    }, () => this.props.input.onChange(value))
  }

  handleTextChange = (evt) => {
    const { value } = evt.target
    const richtext = RichTextEditor.createValueFromString(value, 'markdown')

    this.setState({
      richtext,
      value
    }, () => this.props.input.onChange(value))
  }

  handleTabChange = (_, value) => {
    this.setState({ tab: value })
  }

  render () {
    const { tab } = this.state

    return (
      <div>
        <Tabs value={tab} onChange={this.handleTabChange}>
          <Tab label='Texto' />
          <Tab label='Markdown' />
        </Tabs>
        {tab === 0 && (
          <RichTextEditor
            value={this.state.richtext}
            toolbarConfig={toolbarConfig}
            onChange={this.handleMarkdownChange}
          />
        )}
        {tab === 1 && (
          <div>
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
          </div>
        )}
      </div>
    )
  }
}

export default addField(TextEditor)
