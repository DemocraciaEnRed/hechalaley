/* eslint-disable jsx-a11y/iframe-has-title */
import Link from 'next/link'
import Layout from '../layout'

export default () => (
  <Layout className='cover-page'>
    <div className='about-page' id='about-page'>
      <style jsx>
        {`
          span {
            display: inline;
            
          }
          
          a {
            text-decoration: underline;
            color: #fe3e68;
          }

          .about-page{
            
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

        `}
      </style>
      <div className='about-content'>
        <h3 className='about-title'>Sobre el sitio</h3>
        <p>
          La plataforma "Hecha la Ley" es un desarrollo coordinado conjuntamente
          por <Link href='/about'><a>Directorio Legislativo</a></Link> y <Link href='/about'><a>Democracia en Red</a></Link>.
        </p>
      </div>
    </div>
  </Layout>
)
