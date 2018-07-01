import {
  List,
  Datagrid,
  TextField,
  EditButton
} from 'react-admin'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='politicians' />}
    pagination={null}
    bulkActions={false}
  >
    <Datagrid>
      <TextField source='firstName' />
      <TextField source='lastName' />
      <EditButton />
    </Datagrid>
  </List>
)
