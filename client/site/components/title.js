import Head from 'next/head'

export default ({ children }) => (
  <Head>
    <title>Hecha la Ley{children && ` | ${children}`}</title>
  </Head>
)
