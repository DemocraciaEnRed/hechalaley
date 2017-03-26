import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  BooleanField,
  ReferenceField,
  Filter,
  ReferenceInput,
  SelectInput
} from 'admin-on-rest/lib/mui'
import ListTitle from '../list-title'

const StagesFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput source='bill' reference='bills' alwaysOn>
      <SelectInput optionText='title' />
    </ReferenceInput>
  </Filter>
)

export default (props) => (
  <List
    {...props}
    title={<ListTitle resource='stages' />}
    filters={<StagesFilter />}
    pagination={null}>
    <Datagrid>
      <BooleanField source='published' />
      <TextField source='title' />
      <ReferenceField source='bill' reference='bills'>
        <TextField source='title' />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)
