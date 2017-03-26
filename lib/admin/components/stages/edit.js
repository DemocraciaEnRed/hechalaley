import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DateInput
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'

export default (props) => (
  <Edit actions={null} {...props}>
    <SimpleForm>
      <ReferenceInput
        source='bill'
        reference='bills'
        validation={{ required: true }}
        allowEmpty>
        <SearchableSelectInput optionText='title' />
      </ReferenceInput>
      <NullableBooleanInput source='published' />
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' validation={{ required: true }} />
      <TextInput source='identification' validation={{ required: true }} />
      <DateInput source='stageDate' validation={{ required: true }} />
      <ReferenceInput source='authors' reference='politicians' allowEmpty>
        <SearchableSelectInput
          optionText='fullname'
          options={{ multi: true }} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
