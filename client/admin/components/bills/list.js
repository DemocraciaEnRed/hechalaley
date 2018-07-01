import {
  List,
  Datagrid,
  TextField,
  EditButton,
  BooleanField
} from 'react-admin'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='bills' />}
    pagination={null}
    bulkActions={false}
  >
    <Datagrid>
      <BooleanField source='published' />
      <TextField source='title' />
      <EditButton />
    </Datagrid>
  </List>
)
