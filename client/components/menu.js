const Menu = ({ children }) => (
  <div className='menu'>
    <style jsx>
      {`
        .menu {
          padding-bottom: 200px;
        }
      `}
    </style>
    { children }
  </div>
)

export default Menu

