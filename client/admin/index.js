import { Admin, Resource } from 'admin-on-rest'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as jurisdictions from './components/jurisdictions'
import * as politicians from './components/politicians'
import * as bills from './components/bills'
import * as stages from './components/stages'
import * as users from './components/users'
import Login from './components/auth/login'
import i18n from './i18n'
import theme from './theme'
import authClient from './auth-client'
import restClient from './rest-client'

const App = () => (
  <Admin
    locale='es-AR'
    messages={i18n}
    title='Admin - Hecha la Ley'
    restClient={restClient}
    theme={getMuiTheme(theme)}
    authClient={authClient}
    loginPage={Login}>
    <Resource name='jurisdictions' {...jurisdictions} />
    <Resource name='politicians' {...politicians} />
    <Resource name='bills' {...bills} />
    <Resource name='stages' {...stages} />
    <Resource name='users' {...users} />
    <style global jsx>{`
      .Select-input > input {
        padding: 6px 0;
      }
    `}</style>
  </Admin>
)

export default App
