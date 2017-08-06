import classNames from 'classnames'

const Card = ({ className, href, children }) => (
  <a href={href} className={classNames('card', className)}>
    <style jsx>{`
      .card {
        display: flex;
        flex-direction: column;
        z-index: 0;
        position: relative;
        margin: 15px;
        width: 350px;
        box-shadow:
          0 1px 3px rgba(0,0,0,.12),
          0 1px 2px rgba(0,0,0,.24);
        color: inherit;
        transition: all .3s cubic-bezier(.25,.8,.25,1);
        border-radius: 1px;
        background-color: #fff;
        overflow: hidden;
        color: inherit;
        text-decoration: inherit;
        cursor: pointer;
      }

      .card:hover {
        box-shadow 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23);
      }
    `}</style>
    {children}
  </a>
)

export default Card

export const CardsList = ({ className, children }) => (
  <div className={classNames('cards-list', className)}>
    <style jsx>{`
      .cards-list {
        position: relative
        display: flex
        flex-wrap: wrap
        justify-content: center
        margin-bottom: 4em
      }
    `}</style>
    {children}
  </div>
)
