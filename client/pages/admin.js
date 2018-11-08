import Head from 'next/head'
import dynamic from 'next/dynamic'

const Admin = dynamic(import('../admin'), {
  ssr: false,
  loading: () => null
})

export default () => (
  <div>
    <Head>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='/static/react-select.css' rel='stylesheet' />
    </Head>
    <style global jsx>
      {`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #fafafa;
        }
      `}
    </style>
    <Admin />
  </div>
)
