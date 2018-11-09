/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const MenuLink = ({ child, onClick }) => (
  <div className='menu'>
    <style jsx>
      {`
        }
        p {
          color: red;
          display: inline;
          color: rgba(43,50,69,0.87);
          padding: 0 30px;
        }
        p:hover {
          color: #FD5177;
          cursor: pointer;
          transition: 0.2s ease;
        }
        p:first-child {
          padding-left: 0;
        }
      `}
    </style>
    <p onClick={onClick} >{child}</p>
  </div>
)

export default MenuLink
