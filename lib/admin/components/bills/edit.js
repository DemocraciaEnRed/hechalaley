import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  CheckboxGroupInput
} from 'admin-on-rest/lib/mui'

const checkboxStyles = {
  style: {
    display: 'inline-block',
    width: '350px'
  }
}

export default (props) => (
  <Edit actions={null} {...props}>
    <SimpleForm>
      <BooleanInput source='published' />
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' valdemidation={{ required: true }} />
      <ReferenceInput source='author' reference='politicians'>
        <SelectInput optionText='fullname' />
      </ReferenceInput>
      <ReferenceInput source='coSigners' reference='politicians' allowEmpty>
        <CheckboxGroupInput optionText='fullname' options={checkboxStyles} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
