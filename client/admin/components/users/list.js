import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton
} from 'react-admin'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='users' />}
    pagination={null}
    bulkActions={false}
  >
    <Datagrid>
      <TextField source='email' />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)
