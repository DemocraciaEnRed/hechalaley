import { CardActions } from 'material-ui/Card'
import {
  Edit,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DeleteButton
} from 'admin-on-rest/lib/mui'
import SearchableSelectInput from '../searchable-select-input'

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
    <SimpleForm>
      <NullableBooleanInput source='published' />
      <TextInput source='title' validation={{ required: true }} />
      <TextInput source='summary' validation={{ required: true }} />
      <ReferenceInput source='author' reference='politicians'>
        <SearchableSelectInput optionText='fullname' />
      </ReferenceInput>
      <ReferenceInput source='coSigners' reference='politicians' allowEmpty>
        <SearchableSelectInput
          optionText='fullname'
          options={{ multi: true }} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
