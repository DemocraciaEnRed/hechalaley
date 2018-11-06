import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdInsertLink,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3
} from 'react-icons/md'

export const Icon = ({ name, ...otherProps }) => {
  switch (name) {
    case 'bold':
      return <MdFormatBold {...otherProps} />
    case 'italic':
      return <MdFormatItalic {...otherProps} />
    case 'underlined':
      return <MdFormatUnderlined {...otherProps} />
    case 'bulleted-list':
      return <MdFormatListBulleted {...otherProps} />
    case 'ordered-list':
      return <MdFormatListNumbered {...otherProps} />
    case 'link':
      return <MdInsertLink {...otherProps} />
    case 'heading1':
      return <MdLooksOne {...otherProps} />
    case 'heading2':
      return <MdLooksTwo {...otherProps} />
    case 'heading3':
      return <MdLooks3 {...otherProps} />
    default:
      throw new Error(`Icon "${name}" not found.`)
  }
}
