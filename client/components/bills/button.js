import classNames from '@sindresorhus/class-names'

export default ({ className, active, children, ...otherProps }) => (
  <button
    {...otherProps}
    className={classNames(className, { active })}
  >
    <style jsx>
      {`
        button {
          position: relative;
          display: block;
          margin: 0 auto 1rem;
          padding: .8rem 3rem;
          cursor: pointer;
          background-color: transparent;
          border: solid 1px #fefefe;
          border-radius: 26px;
          color: #fff;
          font-size: 14px;
        }

        button.active {
          background-color: rgba(252, 252, 252, 0.27);
          border: none;
        }
      `}
    </style>
    {children}
  </button>
)
