import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  translate
} from 'react-admin'
import SearchableSelectInput from '../searchable-select-input'

const ListTitle = translate(({ translate, resource, record }) => {
  const title = translate(`resources.${resource}.name`, { smart_count: 1 })
  return (
    <div>
      <span>{title}: {record ? `${record.fullname}` : ''}</span>
    </div>
  )
})

export default (props) => (
  <Edit title={<ListTitle resource='politicians' />} undoable={false} actions={null} {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='firstName' validation={{ required: true }} />
      <TextInput source='lastName' validation={{ required: true }} />
      <TextInput source='bio' />
      <TextInput
        source='pictureUrl'
        validation={{ required: true }}
        placeholder='http://perfiles.com/avatar-usuario.jpg'
      />
      <TextInput
        source='appoinment'
        validation={{ required: true }}
        placeholder='Diputado Nacional'
      />
      <TextInput
        source='party'
        validation={{ required: true }}
        placeholder='Unión Política Lateral'
      />
      <ReferenceInput
        source='jurisdiction'
        reference='jurisdictions'
        allowEmpty
      >
        <SearchableSelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
