import Router from 'next/router'
import Button from './button'
import Logo from './logo'
import Layout from '../layout'
import Menu from '../menu'
import MenuLink from '../menu-link'

export default () => (
  <Layout className='cover-page'>
    <div>
      <style jsx>
        {`
          :global(.cover-page) {
            position: relative;
            padding: 60px 10% 0;
          }
          p {
            max-width: 580px;
            width: 100%;
            line-height: 28px;
            font-size: 21px;
            color: rgba(43, 50, 69, 0.87);
            padding: 30px 0 30px;
          }
          p:first-of-type {
            padding-bottom: 0;
          }
          .line {
            position: relative;
            display: block;
            height: 150px;
            width: 2px;
            background-color: rgba(43, 50, 69, 0.87);
          }
          .cover_img{
            position: absolute;
            width: 806.5px;
            height: 1118.8px;
            top: -200px;
            right: -300px;
          }
          .onboard_img {
            width: 400px;
            height: auto;
          }
          @keyframes imageMovement {
            0% {
              top: -200px;
              right: -300px;
            }
            100% {
              top: -250px;
              right: -250px;
            }
          }
        `}
      </style>
      <Menu>
        <MenuLink onClick={() => Router.push('/')}>Inicio</MenuLink>
        <MenuLink onClick={() => Router.push('/proyects')}>Proyectos</MenuLink>
        <MenuLink onClick={() => Router.push('/know')}>¿Cómo funciona?</MenuLink>
        <MenuLink onClick={() => Router.push('/proposal')}>Nuestra propuesta</MenuLink>
        <MenuLink onClick={() => Router.push('/about')}>Sobre nosotros</MenuLink>
      </Menu>
      <div>
        <Logo />
        {/* TODO: Fix line position
        to fit design
        <span className='line' /> */}
        <p>
          Hecha la ley es un sitio que sigue los proyectos de ley dentro del congreso.
        </p>
        <p>
          Examiná el trabajo legislativo de una manera clara y sencilla.
        </p>
        <img src='/static/onboard_icons.svg' alt='Hecha la Ley - On Board Steps' className='onboard_img' />
        <Button title='Ver proyectos de ley' />
      </div>
      <img src='/static/congreso_forms.png' srcSet='/static/congreso_forms.png 2x' alt='Hecha la Ley Congreso' className='cover_img' />
    </div>
  </Layout>
)
