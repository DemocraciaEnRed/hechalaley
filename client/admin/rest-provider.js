import { fetchUtils } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

const { Headers } = window

const httpClient = (url, options = {}) => {
  const opts = {
    headers: new Headers({ Accept: 'application/json' }),
    ...options,
    credentials: 'include'
  }

  return fetchUtils.fetchJson(url, opts)
}

export default (endpoint = '/api') => simpleRestProvider(endpoint, httpClient)
