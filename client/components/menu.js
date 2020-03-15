const Menu = ({ children }) => (
  <div className='menu'>
    <style jsx>
      {`
        .menu {
          padding-bottom: 200px;
        }

        @media screen  and (max-width: 480px) {
          .menu {
            padding-bottom: 60px;
          }
        }
      `}
    </style>
    { children }
  </div>
)

export default Menu

