import { CardActions } from '@material-ui/core'
import {
  Edit,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DeleteButton
} from 'react-admin'
import SearchableSelectInput from '../searchable-select-input'

const Actions = ({ basePath, data }) => (
  <CardActions>
    <DeleteButton basePath={basePath} record={data} />
  </CardActions>
)

export default (props) => (
  <Edit actions={<Actions />} {...props}>
    <SimpleForm redirect='list'>
      <NullableBooleanInput source='published' />
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' validation={{ required: true }} />
      <ReferenceInput source='author' reference='politicians'>
        <SearchableSelectInput optionText='fullname' />
      </ReferenceInput>
      <ReferenceInput source='coSigners' reference='politicians' allowEmpty>
        <SearchableSelectInput
          optionText='fullname'
          options={{ multi: true }}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
