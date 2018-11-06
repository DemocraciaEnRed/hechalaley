export default () => ({
  schema: {
    document: {
      nodes: [{
        match: [
          { type: 'heading1' },
          { type: 'heading2' },
          { type: 'heading3' },
          { type: 'paragraph' },
          { type: 'ordered-list' },
          { type: 'bulleted-list' },
          { type: 'list-item' },
          { type: 'table' },
          { type: 'table-row' },
          { type: 'table-head' },
          { type: 'table-cell' }
        ]
      }]
    },
    blocks: {
      'list-item': {
        nodes: [{ match: { object: 'text' } }],
        normalize: (change, err) => {
          // slate-md-serializer transforms list items as LI > P > TEXT
          // and we want them as LI > TEXT
          if (err.code === 'child_object_invalid') {
            change.unwrapNodeByKey(err.node.getFirstText().key)
          }
        }
      }
    },
    inlines: {
      bold: {
        nodes: [{ match: { object: 'text' } }]
      },
      italic: {
        nodes: [{ match: { object: 'text' } }]
      },
      underlined: {
        nodes: [{ match: { object: 'text' } }]
      }
    }
  }
})
