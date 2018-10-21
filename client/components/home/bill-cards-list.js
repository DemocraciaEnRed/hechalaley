import classNames from 'classnames'

const BillCardsList = ({ className, children }) => (
  <div className={classNames('cards-list', className)}>
    <style jsx>
      {`
        .cards-list {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 4em;
        }
      `}
    </style>
    {children}
  </div>
)

export default BillCardsList
