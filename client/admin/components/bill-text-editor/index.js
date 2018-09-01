import { Component } from 'react'
import { Editor } from 'slate-react'
import { Toolbar, Button } from './components'
import { deserialize } from './serializer'

const DEFAULT_NODE = 'paragraph'

/* Markdown Editor

Inline Styles:
  * Italic
  * Underline
  * Bold
  * Links

Block Styles:
  * h1 Title
  * h2 Subtitle
  * h3 Section
  * p Paragraph
  * OL Ordered List
  * UL Unordered List
  * Tables (1 level)
*/

const renderNode = (props) => {
  const { attributes, children, node } = props

  switch (node.type) {
    case 'heading1':
      return <h1 {...attributes}>{children}</h1>
    case 'heading2':
      return <h2 {...attributes}>{children}</h2>
    case 'heading3':
      return <h3 {...attributes}>{children}</h3>
    case 'paragraph':
      return <p {...attributes}>{children}</p>
    case 'ordered-list':
      return <ol {...attributes}>{children}</ol>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'table':
      return <table {...attributes}>{children}</table>
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-head':
      return <th {...attributes}>{children}</th>
    case 'table-cell':
      return <td {...attributes}>{children}</td>
    default:
      throw new Error('Couldn\'t render node: ', props)
  }
}

const renderMark = (props) => {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    default:
      throw new Error('Couldn\'t render mark: ', props)
  }
}

export default class BillTextEditor extends Component {
  state = {
    value: deserialize(this.props.defaultValue)
  }

  render () {
    const { value } = this.state

    return (
      <div className='bill-text-editor'>
        <style jsx>
          {`
            .bill-text-editor {
              padding: 20px;
              background-color: #fff;
            }
          `}
        </style>
        <Toolbar>
          {this.renderBlockButton('heading1', 'Título')}
          {this.renderBlockButton('heading2', 'Subtítulo')}
          {this.renderBlockButton('heading3', 'Artículo')}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {this.renderBlockButton('bulleted-list', 'Lista')}
          {this.renderBlockButton('ordered-list', 'Lista Numerada')}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {this.renderMarkButton('bold', 'Negrita')}
          {this.renderMarkButton('italic', 'Itálica')}
          {this.renderMarkButton('underlined', 'Subrayado')}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button title='Enlace' icon='link' />
        </Toolbar>
        <Editor
          spellCheck
          autoFocus
          placeholder='Enter some text...'
          value={value}
          onChange={this.handleChange}
          renderNode={renderNode}
          renderMark={renderMark}
        />
      </div>
    )
  }

  handleChange = ({ value }) => {
    this.setState({ value })
  }

  hasMark = (type) => {
    const { value } = this.state
    if (!value.activeMarks || value.activeMarks.size === 0) return false
    return value.activeMarks.some((mark) => mark.type === type)
  }

  hasBlock = (type) => {
    const { value } = this.state
    return value.blocks.some((block) => block.type === type)
  }

  handleMarkClick = (evt, type) => {
    evt.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.handleChange({ value: change.value })
  }

  handleBlockClick = (evt, type) => {
    evt.preventDefault()

    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'ordered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('ordered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some((block) => (
        !!document.getClosest(block.key, (parent) => parent.type === type)
      ))

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('ordered-list')
      } else if (isList) {
        change
          .unwrapBlock(type === 'bulleted-list'
            ? 'ordered-list'
            : 'bulleted-list')
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    }

    this.handleChange({ value: change.value })
  }

  renderMarkButton = (type, title) => (
    <Button
      title={title}
      icon={type}
      active={this.hasMark(type)}
      onMouseDown={(evt) => this.handleMarkClick(evt, type)}
    />
  )

  renderBlockButton = (type, title) => {
    let isActive = this.hasBlock(type)

    if (['ordered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state
      const parent = value.document.getParent(value.blocks.first().key)
      isActive = this.hasBlock('list-item') && parent && parent.type === type
    }

    return (
      <Button
        title={title}
        icon={type}
        active={isActive}
        onMouseDown={(evt) => this.handleBlockClick(evt, type)}
      />
    )
  }
}
