/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const MenuLink = ({ children, onClick, title }) => (
  <p
    title ={title}
    onClick={onClick}
  >
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

        @media screen and (max-width: 480px) {
          p {
            padding: 10px 0;
          }
        }
      `}
    </style>
    {children}
  </p>
)

export default MenuLink
