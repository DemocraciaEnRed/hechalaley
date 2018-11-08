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
    title={<ListTitle resource='jurisdictions' />}
    exporter={null}
    pagination={null}
    bulkActions={false}
  >
    <Datagrid>
      <TextField source='name' />
      <EditButton />
    </Datagrid>
  </List>
)
