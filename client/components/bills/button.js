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
        }

        button.active {
          background-color: red;
        }
      `}
    </style>
    {children}
  </button>
)
