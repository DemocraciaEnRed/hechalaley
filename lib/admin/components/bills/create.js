import React from 'react'
import {
  Create,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'

export default (props) => (
  <Create {...props}>
    <SimpleForm>
      <NullableBooleanInput source='published' />
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' validation={{ required: true }} />
      <ReferenceInput source='author' reference='politicians' allowEmpty>
        <SearchableSelectInput optionText='fullname' />
      </ReferenceInput>
      <ReferenceInput source='coSigners' reference='politicians' allowEmpty>
        <SearchableSelectInput
          optionText='fullname'
          options={{ multi: true }} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
