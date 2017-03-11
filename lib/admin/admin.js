import React from 'react'
import { render } from 'react-dom'
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as jurisdictions from './components/jurisdictions'
import * as politicians from './components/politicians'
import i18n from './i18n'
import theme from './theme'

const App = () => (
  <Admin
    locale='es-AR'
    messages={i18n}
    title='Admin - Hecha la Ley'
    restClient={jsonServerRestClient('/api')}
    theme={getMuiTheme(theme)}>
    <Resource name='jurisdictions' {...jurisdictions} />
    <Resource name='politicians' {...politicians} />
  </Admin>
)

render(<App />, document.getElementById('root'))
