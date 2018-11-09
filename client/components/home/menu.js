import Link from 'next/link'

const Menu = () => (
  <div className='menu'>
    <style jsx>
      {`
        .menu {
          padding-bottom: 200px;
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
    <Link href='#'>
      <p>Inicio</p>
    </Link>
    <Link href='#'>
      <p>Proyectos</p>
    </Link>
    <Link href='#'>
      <p>Nuestra Propuesta</p>
    </Link>
    <Link href='#'>
      <p>Sobre Nosotros</p>
    </Link>
  </div>
)

export default Menu
