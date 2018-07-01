import { Create, SimpleForm, TextInput } from 'react-admin'

export default (props) => (
  <Create {...props}>
    <SimpleForm redirect='list'>
      <TextInput source='name' validation={{ required: true }} />
    </SimpleForm>
  </Create>
)
