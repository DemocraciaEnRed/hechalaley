import classNames from 'classnames'
import Head from 'next/head'
import Title from './title'

const Layout = ({ className, children }) => (
  <div className={classNames(className)}>
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='description' content='Seguí el estado de los proyectos de Ley.' />
      <link href='/static/fonts/index.css' rel='stylesheet' />
    </Head>
    <Title />
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      button {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
      }

      img {
        max-width: 100%;
      }

      body {
        font-size: 16px;
        text-rendering: geometricPrecision;
        font-family: Avenir Next, Helvetica, Arial, sans-serif;
        background-color: #f6fafd;
      }
    `}</style>
    { children }
  </div>
)

export default Layout
