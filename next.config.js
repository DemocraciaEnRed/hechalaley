module.exports = {
  webpack: (config) => {
    /**
     * All the CSS at /admin is being builded awfully when NODE_ENV=production
     * So, we're desactivating assets compression for now,
     * lets wait that react-admin or material-ui fix the problem.
     */
    config.mode = 'development' // eslint-disable-line
    return config
  }
}
