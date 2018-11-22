import Link from 'next/link'
import Button from './button'
import Logo from './logo'
import Layout from '../layout'
import Menu from '../menu'
import MenuLink from '../menu-link'
import Anchor from '../anchor'

export default () => (
  <Layout className='cover-page'>
    <Anchor id='home' />
    <div>
      <style jsx>
        {`
          :global(.cover-page) {
            position: relative;
            padding: 60px 10% 0;
            overflow: hidden;
          }
          a {
            background-color: red;
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
            z-index: 2000;
            width: 806.5px;
            height: 1118.8px;
            top: -200px;
            right: -300px;
          }
          .onboard_img {
            width: 400px;
            height: auto;
          }
        `}
      </style>
      <Menu>
        <Link href='/#home' title='Home'>
          <MenuLink>Inicio</MenuLink>
        </Link>
        <Link href='/#bill-list' title='Bill list'>
          <MenuLink>Proyectos</MenuLink>
        </Link>
        <Link href='/#how-works' title='How it Works'>
          <MenuLink>¿Cómo funciona?</MenuLink>
        </Link>
        <Link href='/#proposal' title='Our proposal'>
          <MenuLink>Nuestra propuesta</MenuLink>
        </Link>
        <Link href='/#about-us' title='Our proposal'>
          <MenuLink>Sobre nosotros</MenuLink>
        </Link>
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
