import { Component } from 'react'
import { addField } from 'react-admin'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Textarea from './autogrow-textarea'
import BillTextEditor from './bill-text-editor'

const MarkdowEditor = (props) => (
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
        height: 500,
        border: '1px solid rgba(0, 0, 0, .2)'
      }}
      {...props}
    />
  </div>
)

class TextEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.input.value,
      tab: 0
    }
  }

  handleMarkdownChange = (richtext) => {
    const value = richtext.toString('markdown')

    this.setState({
      value
    }, () => this.props.input.onChange(value))
  }

  handleTextChange = (evt) => {
    const { value } = evt.target

    this.setState({
      value
    }, () => this.props.input.onChange(value))
  }

  handleTabChange = (_, value) => {
    this.setState({ tab: value })
  }

  render () {
    return (
      <MarkdowEditor
        value={this.state.value}
        onChange={this.handleTextChange}
      />
    )
  }

  render2 () {
    const { tab } = this.state

    return (
      <div>
        <Tabs value={tab} onChange={this.handleTabChange}>
          <Tab label='Texto' />
          <Tab label='Markdown' />
        </Tabs>
        {tab === 0 && (
          <BillTextEditor
            defaultValue={this.state.value}
          />
        )}
        {tab === 1 && (
          <MarkdowEditor
            value={this.state.value}
            onChange={this.handleTextChange}
          />
        )}
      </div>
    )
  }
}

export default addField(TextEditor)
