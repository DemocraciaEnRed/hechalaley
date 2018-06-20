import { List, Datagrid, TextField, EditButton, DeleteButton } from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='users' />}
    pagination={null}
  >
    <Datagrid>
      <TextField source='email' />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)
