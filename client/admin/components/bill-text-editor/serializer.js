import MarkdownSerializer from 'slate-md-serializer'

const Markdown = new MarkdownSerializer()

export const deserialize = (md) => {
  const value = Markdown.deserialize(md)
  console.log(value)
  return value
}
