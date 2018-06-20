import {
  List,
  Datagrid,
  TextField,
  EditButton,
  BooleanField
} from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='bills' />}
    pagination={null}
  >
    <Datagrid>
      <BooleanField source='published' />
      <TextField source='title' />
      <EditButton />
    </Datagrid>
  </List>
)
