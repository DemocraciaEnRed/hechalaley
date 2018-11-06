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
