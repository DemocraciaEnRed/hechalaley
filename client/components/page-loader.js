import NProgress from 'nprogress'
import Router from 'next/router'

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

import Head from 'next/head'

const PageLoader = () => (
  <Head>
    <link href='/static/nprogress.css' rel='stylesheet' />
  </Head>
)

export default PageLoader
