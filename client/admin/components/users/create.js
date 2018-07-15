import { Create, SimpleForm, TextInput } from 'react-admin'

export default (props) => (
  <Create {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='email' validation={{ required: true }} />
    </SimpleForm>
  </Create>
)
