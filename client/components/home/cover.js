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
            width: 700px;
            height: auto;
            top: 50px;
            right: 0px;
          }
          .onboard_img {
            width: 400px;
            height: auto;
          }
          .cover-content {
            padding-bottom: 60px;
          }

          @media screen  and (max-width: 480px) {
            .cover_img {
              display: none;
            }

            p {
              font-size: 18px;
              padding: 20px 0 30px;
            }
          }
        `}
      </style>
      <Menu>
        <Link href='/#home'>
          <MenuLink title='Home'>Inicio</MenuLink>
        </Link>
        <Link href='/#bill-list'>
          <MenuLink title='Bill list'>Proyectos</MenuLink>
        </Link>
        <Link href='/#how-works'>
          <MenuLink title='How it Works'>¿Cómo funciona?</MenuLink>
        </Link>
        <Link href='/#proposal'>
          <MenuLink title='Our proposal'>Nuestra propuesta</MenuLink>
        </Link>
        <Link href='/#about-us'>
          <MenuLink title='Our proposal'>Sobre nosotros</MenuLink>
        </Link>
      </Menu>
      <div className='cover-content'>
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
        <img
          src='/static/onboard_icons.svg'
          alt='Hecha la Ley - On Board Steps'
          className='onboard_img'
        />
        <Button buttonHref='/#bill-list' title='Ver proyectos de ley' />
      </div>
      <img
        src='/static/congress_main.png'
        srcSet='/static/congress_main@2x.png 2x'
        alt='Hecha la Ley Congreso'
        className='cover_img'
      />
    </div>
  </Layout>
)
