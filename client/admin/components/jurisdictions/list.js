import { List, Datagrid, TextField, EditButton } from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='jurisdictions' />}
    pagination={null}
  >
    <Datagrid>
      <TextField source='name' />
      <EditButton />
    </Datagrid>
  </List>
)
