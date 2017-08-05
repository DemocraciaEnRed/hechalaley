import { simpleRestClient, Admin, Resource } from 'admin-on-rest'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as jurisdictions from './components/jurisdictions'
import * as politicians from './components/politicians'
import * as bills from './components/bills'
import * as stages from './components/stages'
import i18n from './i18n'
import theme from './theme'

const App = () => (
  <Admin
    locale='es-AR'
    messages={i18n}
    title='Admin - Hecha la Ley'
    restClient={simpleRestClient('/api')}
    theme={getMuiTheme(theme)}>
    <style global jsx>{`
      .Select-input > input {
        padding: 6px 0;
      }
    `}</style>
    <Resource name='jurisdictions' {...jurisdictions} />
    <Resource name='politicians' {...politicians} />
    <Resource name='bills' {...bills} />
    <Resource name='stages' {...stages} />
  </Admin>
)

export default App
