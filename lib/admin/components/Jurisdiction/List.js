import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest/lib/mui'

export default (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='name' />
    </Datagrid>
  </List>
)
