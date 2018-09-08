import MarkdownSerializer from 'slate-md-serializer'

const Markdown = new MarkdownSerializer()

export const deserialize = (md) => Markdown.deserialize(md)
