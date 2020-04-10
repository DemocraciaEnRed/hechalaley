import { CardActions } from '@material-ui/core'
import {
  Edit,
  SimpleForm,
  TextInput,
  NullableBooleanInput,
  ReferenceInput,
  DeleteButton,
  translate
} from 'react-admin'
import SearchableSelectInput from '../searchable-select-input'

const Actions = ({ basePath, data }) => (
  <CardActions>
    <DeleteButton basePath={basePath} record={data} />
  </CardActions>
)

const ListTitle = translate(({ translate, resource, record }) => {
  const title = translate(`resources.${resource}.name`, { smart_count: 1 }) 
  return ( 
    <div>
      <span>{title}: {record ? `${record.title}` : ''}</span>
    </div>
  )
})

export default (props) => (
  <Edit title={<ListTitle resource='bills' />} actions={<Actions />} {...props}>
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
