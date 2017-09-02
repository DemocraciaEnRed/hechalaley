import { Create, SimpleForm, TextInput } from 'admin-on-rest/lib/mui'

export default (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='email' validation={{ required: true }} />
    </SimpleForm>
  </Create>
)
