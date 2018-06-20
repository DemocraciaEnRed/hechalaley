import { simpleRestClient, fetchUtils } from 'admin-on-rest'

const { Headers } = window

const httpClient = (url, options = {}) => {
  const opts = {
    headers: new Headers({ Accept: 'application/json' }),
    ...options,
    credentials: 'same-origin'
  }

  return fetchUtils.fetchJson(url, opts)
}

export default simpleRestClient('/api', httpClient)
