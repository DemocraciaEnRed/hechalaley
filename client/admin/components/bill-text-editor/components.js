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

export const Toolbar = ({ children }) => (
  <div className='toolbar'>
    <style jsx>
      {`
        .toolbar {
          position: relative;
          padding: 0 1em .7em;
          border-bottom: 2px solid #eee;
          margin-bottom: 1em;
        }
      `}
    </style>
    {children}
  </div>
)

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

export const Button = ({ title, icon, active = false, ...otherProps }) => (
  <button
    className={`button${active ? ' active' : ''}`}
    {...otherProps}
  >
    <style jsx>
      {`
        .button {
          position: relative;
          display: inline-block;
          margin-left: 1em;
          font-size: 1em;
          cursor: pointer;
          overflow: hidden;
        }

        .button:first-of-type {
          margin-left: 0;
        }

        .button:hover,
        .button:focus {
          overflow: visible;
        }

        .tooltip {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          transition: opacity .15s;
          padding: .3em .7em;
          font-size: .8em;
          color: #fff;
          font-weight: 100;
          text-align: center;
          border-radius: 3px;
          background-color: #333;
        }

        .button:hover .tooltip,
        .button:focus .tooltip {
          opacity: 1;
          visibility: visible;
        }
      `}
    </style>
    {icon && (
      <Icon
        name={icon}
        color={active ? '#333' : '#aaa'}
        size='1.25em'
      />
    )}
    {title && (
      <span className='tooltip'>{title}</span>
    )}
  </button>
)
