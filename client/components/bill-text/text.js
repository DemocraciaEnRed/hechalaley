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

        .bills-text-container {
          background: #fff;
          border-radius: 10px;
          padding: 0 180px;
          padding-top: 100px;
        }

        .bills-text {
          padding: 30px;
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
