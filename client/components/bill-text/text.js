import classNames from '@sindresorhus/class-names'
import Style from './style'
import diff from './diff'

export default ({
  text,
  className = null,
  hide = null,
  ...otherProps
}) => (
  <div className={classNames('bills-text-container', hide && `hide-${hide}`)}>
    <style jsx>
      {`
        .hide-ins :global(ins),
        .hide-del :global(del) {
          visibility: hidden;
        }
      `}
    </style>
    <Style className='bills-text' />
    <div
      className={classNames('bills-text', className)}
      dangerouslySetInnerHTML={{ __html: diff(text, hide) }}
      {...otherProps}
    />
  </div>
)
