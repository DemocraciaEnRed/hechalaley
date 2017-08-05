import Head from 'next/head'
import dynamic from 'next/dynamic'

const Loader = () => (
  <div className='loader'>
    <style global jsx>{`
      body {
        background-color: #edecec;
      }
    `}</style>
    <style jsx>{`
      .loader {
        height: 64px;
        background-color: #404659;
      }
    `}</style>
  </div>
)

const Admin = dynamic(import('../admin'), {
  ssr: false,
  loading: Loader
})

export default () => (
  <div>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='/static/react-select.css' rel='stylesheet' />
    </Head>
    <style global jsx>{`
      html,
      body {
        padding: 0;
        margin: 0;
      }
    `}</style>
    <Admin />
  </div>
)
