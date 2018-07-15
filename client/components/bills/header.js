const Header = ({ title }) => (
  <div className='header'>
    <style>
      {`
        h1 {
          color: #2b3245;
          font-size: 3em;
          font-weight: 700;
          // text-transform: uppercase;
          letter-spacing: .8px;
          margin-top: 2em;
          margin-bottom: 1em;
          hyphens: auto;
        }
      `}
    </style>
    <h1 className='bills-content'>{title}</h1>
  </div>
)

export default Header
