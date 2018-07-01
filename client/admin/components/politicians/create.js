import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput
} from 'react-admin'
import SearchableSelectInput from '../searchable-select-input'

export default (props) => (
  <Create {...props}>
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
  </Create>
)
