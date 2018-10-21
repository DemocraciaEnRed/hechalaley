import Link from 'next/link'

const Menu = () => (
  <div className='menu'>
    <style jsx>
      {`
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
    <Link>
        <p>Inicio</p>
    </Link>
    <Link>
        <p>Proyectos</p>
    </Link>
    <Link>
        <p>Nuestra Propuesta</p>
    </Link>
    <Link>
        <p>Sobre Nosotros</p>
    </Link>
  </div>
)

export default Menu
