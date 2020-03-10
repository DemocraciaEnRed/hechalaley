import ReactGA from 'react-ga'
import { getConfig } from './with-config'

const noop = () => ({})

let inited = false

export default (Page) => {
  const overriden = Page.getInitialProps || noop

  // eslint-disable-next-line no-param-reassign
  Page.getInitialProps = async (ctx) => {
    const props = await overriden(ctx)
    const config = getConfig(ctx)

    if (!ctx.req && config.analyticsId) {
      if (inited === false) {
        ReactGA.initialize(config.analyticsId)
        inited = true
      }

      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    return props
  }

  return Page
}
