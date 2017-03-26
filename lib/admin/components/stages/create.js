import React from 'react'
import {
  Create,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DateInput
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'

export default (props) => (
  <Create {...props}>
    <SimpleForm>
      <NullableBooleanInput source='published' />
      <ReferenceInput
        source='bill'
        reference='bills'
        validation={{ required: true }}
        allowEmpty>
        <SearchableSelectInput optionText='title' />
      </ReferenceInput>
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' />
      <TextInput source='identification' />
      <DateInput source='stageDate' validation={{ required: true }} />
      <ReferenceInput source='authors' reference='politicians' allowEmpty>
        <SearchableSelectInput
          optionText='fullname'
          options={{ multi: true }} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
