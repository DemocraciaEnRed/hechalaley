import Router from 'next/router'
import MenuLink from './menu-link'

const Menu = () => (
  <div className='menu'>
    <style jsx>
      {`
        .menu {
          padding-bottom: 200px;
        }
      `}
    </style>
    <MenuLink onClick={() => Router.push('/')}>Inicio</MenuLink>
    <MenuLink onClick={() => Router.push('/proyects')}>Proyectos</MenuLink>
    <MenuLink onClick={() => Router.push('/proposal')}>Nuestra Propuesta</MenuLink>
    <MenuLink onClick={() => Router.push('/about')}>Sobre Nosotros</MenuLink>
  </div>
)

export default Menu
