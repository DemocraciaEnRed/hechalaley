export const renderNode = (props) => {
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

export const renderMark = (props) => {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'placeholder':
      return <span {...attributes}>{children}</span>
    default:
      throw new Error('Couldn\'t render mark: ', props)
  }
}
