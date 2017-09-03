import { simpleRestClient, fetchUtils } from 'admin-on-rest'

const { Headers } = window

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }

  options.credentials = 'same-origin'

  return fetchUtils.fetchJson(url, options)
}

export default simpleRestClient('/api', httpClient)
