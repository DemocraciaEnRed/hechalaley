import classNames from '@sindresorhus/class-names'
import { Icon } from './icon'

const Base = ({
  children,
  icon,
  active = false,
  ...otherProps
}) => (
  <button
    className={classNames('button', { active })}
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
      `}
    </style>
    {icon && (
      <Icon
        name={icon}
        color={active ? '#333' : '#aaa'}
        size='1.25em'
      />
    )}
    {children}
  </button>
)

export const Button = ({
  children,
  title,
  ...otherProps
}) => (
  <Base {...otherProps}>
    <style jsx>
      {`
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

        Base:hover .tooltip,
        Base:focus .tooltip {
          opacity: 1;
          visibility: visible;
        }
      `}
    </style>
    {children}
    {title && <span className='tooltip'>{title}</span>}
  </Base>
)
