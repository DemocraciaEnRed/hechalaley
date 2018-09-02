declare module 'dos-config' {
  interface Config {
    logLevel: 'error' | 'warn' | 'log' | 'debug'
    nodeEnv: 'development' | 'production'
    mongodbUri: string
    protocol: 'http' | 'https'
    host: string
    port: number
    publicPort: number
    trustProxy: boolean
    jwtToken: string
    notificationCatcherUrl: string
    notifier: {
      useNotificationCatcher: boolean
      channels: {
        email: object
      }
    }
  }

  const config: Config

  export = config
}
