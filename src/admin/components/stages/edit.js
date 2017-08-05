import React from 'react'
import { CardActions } from 'material-ui/Card'
import {
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DateInput,
  DeleteButton
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'
import TextEditor from '../text-editor'

const Actions = ({ basePath, data }) => (
  <CardActions style={{
    zIndex: 2,
    display: 'inline-block',
    float: 'right'
  }}>
    <DeleteButton basePath={basePath} record={data} />
  </CardActions>
)

export default (props) => (
  <Edit actions={<Actions />} {...props}>
    <TabbedForm>
      <FormTab label='hechalaley.stageAttributes'>
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
      </FormTab>
      <FormTab label='hechalaley.stageText'>
        <TextEditor source='text' />
      </FormTab>
    </TabbedForm>
  </Edit>
)
