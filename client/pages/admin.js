import Head from 'next/head'
import dynamic from 'next/dynamic'
import withConfig from '../helpers/with-config'

const Admin = dynamic(import('../admin'), {
  ssr: false,
  loading: () => null
})

const Page = ({ config }) => (
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
    <Admin apiUrl={config.apiUrl} />
  </div>
)

export default withConfig(Page)
