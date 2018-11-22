const noop = () => ({})

const config = {}

export default (Page) => {
  const overriden = Page.getInitialProps || noop

  // eslint-disable-next-line no-param-reassign
  Page.getInitialProps = (ctx) => {
    if (ctx.req) Object.assign(config, ctx.req.locals.config)

    const props = overriden(ctx)

    return {
      ...props,
      config
    }
  }

  return Page
}
