import React from 'react'
import { render } from 'react-dom'
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest'
import * as Jurisdiction from './components/Jurisdiction'

const App = () => (
  <Admin title='Admin | Hecha la Ley' restClient={jsonServerRestClient('/api')}>
    <Resource name='jurisdictions' list={Jurisdiction.List} />
  </Admin>
)

render(<App />, document.getElementById('root'))
