import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'

export default (props) => (
  <Edit actions={null} {...props}>
    <SimpleForm>
      <TextInput source='name' validation={{ required: true }} />
      <TextInput source='lastname' validation={{ required: true }} />
      <TextInput source='bio' />
      <TextInput
        source='pictureURL'
        validation={{ required: true }}
        placeholder='http://perfiles.com/avatar-usuario.jpg' />
      <TextInput
        source='appoinment'
        validation={{ required: true }}
        placeholder='Diputado Nacional' />
      <TextInput
        source='party'
        validation={{ required: true }}
        placeholder='Unión Política Lateral' />
      <ReferenceInput
        source='jurisdiction'
        reference='jurisdictions'
        allowEmpty>
        <SearchableSelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
