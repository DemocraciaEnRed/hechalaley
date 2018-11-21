import React from 'react'
import { Admin, Resource } from 'react-admin'
import * as jurisdictions from './components/jurisdictions'
import * as politicians from './components/politicians'
import * as bills from './components/bills'
import * as stages from './components/stages'
import * as users from './components/users'
import Login from './components/auth/login'
import i18n from './i18n'
import theme from './theme'
import restProvider from './rest-provider'
import authProvider from './auth-provider'

const App = ({ apiUrl }) => (
  <Admin
    locale='es-AR'
    i18nProvider={i18n}
    title='Admin - Hecha la Ley'
    dataProvider={restProvider(apiUrl)}
    theme={theme}
    authProvider={authProvider}
    loginPage={Login}
  >
    <Resource name='jurisdictions' {...jurisdictions} />
    <Resource name='politicians' {...politicians} />
    <Resource name='bills' {...bills} />
    <Resource name='stages' {...stages} />
    <Resource name='users' {...users} />
  </Admin>
)

export default App
