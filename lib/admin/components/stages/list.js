import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  BooleanField,
  ReferenceField
} from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='stages' />}
    pagination={null}>
    <Datagrid>
      <BooleanField source='published' />
      <ReferenceField source='billID' reference='bills'>
        <TextField source='title' />
      </ReferenceField>
      <TextField source='title' />
      <EditButton />
    </Datagrid>
  </List>
)
