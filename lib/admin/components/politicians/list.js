import React from 'react'
import { List, Datagrid, TextField, EditButton } from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='politicians' />}
    pagination={null}>
    <Datagrid>
      <TextField source='firstname' />
      <TextField source='lastname' />
      <EditButton />
    </Datagrid>
  </List>
)
