/* eslint-disable jsx-a11y/iframe-has-title */
import Link from 'next/link'
import Layout from '../layout'

export default () => (
  <Layout className='cover-page'>
    <div className='about-page' id='about-page'>
      <style jsx>
        {`
          a {
            color: #fe3e68;
            cursor: pointer;
          }

          a:hover {
            text-decoration: underline;
          }

          .about-title {
            color: #2b3245;
          }

          .about-title::after {
            content: '';
            display: inline-block;
            margin-left: 7px;
            width: 20px;
            height: 4px;
            background-color: #fe3e68;
          }
          
          .about-content {
            text-align: center;
            padding-top: 80px;
            max-width: 550px;
            margin: 0 auto;
          }
          
          .about-content p {
            padding-top: 15px;
          }

          .about-logo-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 15px;
          }

          .about-logo-container .logo-box {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            height: 130px;
            width: 215px;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.16);
            margin: 15px;
          }

          .dl-logo {
            max-height: 78px;
          }

          .der-logo {
            max-height: 75px;
          }

        `}
      </style>
      <div className='about-content'>
        <h2 className='about-title'>Sobre el sitio</h2>
        <p>
          La plataforma "Hecha la Ley" es un desarrollo coordinado conjuntamente
          por <Link href='http://directoriolegislativo.org/'><a>Directorio Legislativo</a></Link> y <Link href='https://democraciaenred.org/'><a>Democracia en Red</a></Link>.
        </p>
      </div>
      <div className='about-logo-container'>
        <div className='logo-box'>
          <img src='/static/logo-DER.svg' alt='Democracia en Red - Logo' className='der-logo' />
        </div>
        <div className='logo-box'>
          <img src='/static/logo-dl4americas.svg' alt='Directorio Legislativo - Logo' className='dl-logo' />
        </div>
      </div>
    </div>
  </Layout>
)
