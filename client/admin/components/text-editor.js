import { Component } from 'react'
import { addField } from 'react-admin'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import BillTextEditor from './bill-text-editor'
import MarkdowEditor from './markdown-editor'

class TextEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.input.value,
      tab: 0
    }
  }

  handleChange = (value) => {
    this.setState({ value }, () => this.props.input.onChange(value))
  }

  handleMarkdownChange = (evt) => {
    const { value } = evt.target
    this.handleChange(value)
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
          <BillTextEditor
            defaultValue={this.state.value}
            onChange={this.handleChange}
          />
        )}
        {tab === 1 && (
          <MarkdowEditor
            value={this.state.value}
            onChange={this.handleMarkdownChange}
          />
        )}
      </div>
    )
  }
}

export default addField(TextEditor)
