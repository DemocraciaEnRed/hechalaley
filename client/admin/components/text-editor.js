import { Component } from 'react'
import RichTextEditor from 'react-rte'
import { Tabs, Tab } from 'material-ui/Tabs'

const toolbarConfig = {
  extraProps: {
    sarasa: 'true'
  },
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
      value: RichTextEditor.createValueFromString(props.input.value, 'markdown'),
      text: props.input.value
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
      text: value.toString('markdown')
    }, () => this.props.input.onChange(this.state.text))
  }

  handleTextChange = (text) => {
    this.setState({
      value: RichTextEditor.createValueFromString(text, 'markdown'),
      text
    }, () => this.props.input.onChange(this.state.text))
  }

  render () {
    return (
      <Tabs style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Tab label='Texto' style={{ textTransform: 'none' }}>
          <RichTextEditor
            value={this.state.value}
            toolbarConfig={toolbarConfig}
            customControls={[custom]}
            onChange={this.handleChange} />
        </Tab>
        <Tab label='Markdown' style={{ textTransform: 'none' }}>
          <p><small><strong>Markdown</strong> es el formato base que se utiliza para guardar el texto en la base de datos. Aquí puedes editarlo directamente, o copiar y pegarlo desde otras fuentes sin arruinar los estilos.</small></p>
          <textarea
            style={{
              display: 'block',
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
            value={this.state.text}
            onChange={this.handleTextChange} />
        </Tab>
      </Tabs>
    )
  }
}

const custom = (...args) => {
  console.log(args)
  return <span>A</span>
}
