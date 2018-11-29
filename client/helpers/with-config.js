const noop = () => ({})

const config = {}

export const getConfig = (ctx) => {
  if (ctx.req) Object.assign(config, ctx.req.locals.config)
  return { ...config }
}

export default (Page) => {
  const overriden = Page.getInitialProps || noop

  // eslint-disable-next-line no-param-reassign
  Page.getInitialProps = async (ctx) => {
    const props = await overriden(ctx)
    const config = getConfig(ctx)

    return {
      ...props,
      config: { ...config }
    }
  }

  return Page
}
